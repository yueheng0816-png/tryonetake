import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";
import { getPrediction, PHOTOS_PER_ORDER } from "@/lib/replicate";
import { handleOrderCompletion } from "@/lib/refund";
import { transferToBlob } from "@/lib/blob";

/**
 * GET /api/orders/[id]/check
 *
 * Polls Replicate for pending predictions and updates the order.
 * Required for local dev because Replicate webhooks can't reach localhost.
 *
 * Uses optimistic locking (version field) to prevent race conditions
 * with concurrent webhook deliveries.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  // ── Optimistic-lock retry loop ──────────────────────────
  const MAX_RETRIES = 3;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const order = await db.order.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        status: true,
        plan: true,
        amount: true,
        stripeSessionId: true,
        predictionIds: true,
        outputPhotos: true,
        completedPredictions: true,
        failedPredictions: true,
        errorMessages: true,
        refundStatus: true,
        version: true,
      },
    });

    if (!order) {
      return new NextResponse("Not found", { status: 404 });
    }

    const user = await ensureUser(userId);
    if (order.userId !== user.id) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Accept "paid" and "generating" states.
    // Also accept "completed" if outputPhotos is corrupted —
    // the old webhook race condition could write all-empty arrays
    // to completed orders. We detect this by checking whether
    // completedPredictions > 0 but all outputPhotos are empty.
    const validOutputCount = order.outputPhotos.filter(Boolean).length;
    const needsRecovery =
      order.status === "completed" &&
      order.predictionIds.length > 0 &&
      order.completedPredictions > 0 &&
      validOutputCount < order.predictionIds.filter(Boolean).length;

    if (
      order.status !== "generating" &&
      order.status !== "paid" &&
      !needsRecovery
    ) {
      return NextResponse.json({ status: order.status, updated: false });
    }

    if (needsRecovery) {
      console.log(
        `[OneTake] Recovery mode for ${id}: completedPredictions=${order.completedPredictions} ` +
          `but only ${validOutputCount} valid output URLs — re-polling Replicate`
      );
    }

    // Initialize a fixed-size array with empty strings.
    const totalSlots = order.predictionIds.length;
    const outputPhotos: string[] = new Array(totalSlots).fill("");
    let completed = 0;

    if (needsRecovery) {
      console.log(
        `[OneTake] Recovery: order ${id} — ${totalSlots} slots, ` +
          `${order.predictionIds.filter(Boolean).length} valid prediction IDs, ` +
          `${order.completedPredictions} completed predictions, ` +
          `${order.outputPhotos.filter(Boolean).length} existing valid outputs`
      );
    }

    // Restore any previously saved outputs
    for (let i = 0; i < Math.min(order.outputPhotos.length, totalSlots); i++) {
      const existing = order.outputPhotos[i];
      if (existing && existing !== "__failed__") {
        outputPhotos[i] = existing;
        completed++;
      } else if (existing === "__failed__") {
        outputPhotos[i] = ""; // failed slot — keep as empty, count as done
        completed++;
      }
    }

    if (needsRecovery) {
      console.log(
        `[OneTake] Recovery: restored ${completed} existing outputs from DB`
      );
    }

    let newlyCompleted = 0;
    let polledCount = 0;
    let pollSuccess = 0;
    let pollFailed = 0;
    let pollSkipped = 0;
    let newFailures = 0;
    const failureErrors: string[] = [];

    for (let i = 0; i < totalSlots; i++) {
      const predictionId = order.predictionIds[i];
      if (!predictionId) {
        // No prediction was ever created for this slot (e.g. blocked by
        // moderation). Count it as done — there's nothing to wait for.
        pollSkipped++;
        completed++;
        newFailures++;
        failureErrors.push(`Slot ${i}: prediction never created`);
        continue;
      }

      // Already have output for this slot
      if (outputPhotos[i]) {
        pollSkipped++;
        continue;
      }

      polledCount++;
      try {
        const prediction = await getPrediction(predictionId);
        if (!prediction) {
          pollFailed++;
          newFailures++;
          failureErrors.push(`Slot ${i}: prediction ${predictionId} not found`);
          completed++;
          continue;
        }

        if (prediction.status === "succeeded") {
          const output = Array.isArray(prediction.output)
            ? prediction.output[0]
            : prediction.output;
          if (typeof output === "string" && output.length > 0) {
            // Transfer to Vercel Blob for permanent storage
            outputPhotos[i] = await transferToBlob(output, id, i);
            newlyCompleted++;
            completed++;
            pollSuccess++;
          } else {
            // Succeeded but output URL unparseable — treat as failure
            completed++;
            pollFailed++;
            newFailures++;
            failureErrors.push(
              `Slot ${i}: succeeded but no usable output URL (type: ${typeof prediction.output})`
            );
          }
        } else if (prediction.status === "failed" || prediction.status === "canceled") {
          // Terminal failure states — keep slot empty, count as done
          completed++;
          pollFailed++;
          newFailures++;
          failureErrors.push(
            `Slot ${i}: ${prediction.status}${prediction.error ? ` — ${prediction.error}` : ""}`
          );
        }
        // else: still "starting" or "processing" — skip
      } catch (err) {
        pollFailed++;
        newFailures++;
        const msg = err instanceof Error ? err.message : String(err);
        failureErrors.push(`Slot ${i}: poll error — ${msg}`);
        completed++;
        // Network error polling this prediction — count as done, try next poll
      }
    }

    if (needsRecovery || polledCount > 0) {
      console.log(
        `[OneTake] Recovery poll result for ${id}: ` +
          `polled=${polledCount} success=${pollSuccess} failed=${pollFailed} skipped=${pollSkipped} ` +
          `newlyCompleted=${newlyCompleted} totalCompleted=${completed}`
      );
    }

    // Update order if we got new results or discovered new failures
    if (newlyCompleted > 0 || newFailures > 0) {
      const allDone =
        completed >= PHOTOS_PER_ORDER ||
        completed >= order.predictionIds.filter(Boolean).length;

      // Combined failed count: what was already in DB + newly discovered
      const totalFailed = order.failedPredictions + newFailures;

      try {
        await db.order.update({
          where: {
            id,
            version: order.version, // ← optimistic lock
          },
          data: {
            outputPhotos,
            completedPredictions: completed,
            version: { increment: 1 },
            status: allDone ? "completed" : "generating",
            ...(newFailures > 0
              ? {
                  failedPredictions: totalFailed,
                  errorMessages: { push: failureErrors },
                }
              : {}),
          },
        });

        // ── Trigger refund if all done with failures ─────────
        // This is the safety net for:
        //  (a) local dev (no webhooks reach localhost)
        //  (b) race condition where webhooks completed the order
        //      before the trigger route wrote failedPredictions
        if (allDone && totalFailed > 0 && !order.refundStatus) {
          const user = await db.user.findUnique({ where: { id: order.userId } });
          handleOrderCompletion({
            orderId: id,
            checkoutId: order.stripeSessionId ?? null,
            userEmail: user?.email ?? "",
            plan: order.plan,
            orderAmount: order.amount,
            totalPredictions:
              order.predictionIds.length > 0
                ? order.predictionIds.filter(Boolean).length + totalFailed
                : PHOTOS_PER_ORDER,
            failedPredictions: totalFailed,
            errorMessages: [...order.errorMessages, ...failureErrors],
          }).catch((e: unknown) =>
            console.error("[OneTake] check-route refund handler failed:", e)
          );
          console.log(
            `[OneTake] Check route triggered refund for ${id}: ` +
              `${totalFailed} failed (${order.failedPredictions} prior + ${newFailures} new)`
          );
        }

        return NextResponse.json({
          status: allDone ? "completed" : order.status,
          updated: true,
          newlyCompleted,
          totalCompleted: completed,
        });
      } catch (error: unknown) {
        const code = (error as { code?: string })?.code;
        if (code === "P2025" && attempt < MAX_RETRIES - 1) {
          // Version conflict — another writer updated concurrently, retry
          await new Promise((r) => setTimeout(r, 30 + Math.random() * 80));
          continue;
        }
        throw error;
      }
    }

    // No new results
    return NextResponse.json({
      status: order.status,
      updated: false,
      newlyCompleted: 0,
      totalCompleted: completed,
    });
  }

  // Exhausted retries
  return NextResponse.json(
    { status: "error", updated: false, reason: "Retry exhausted" },
    { status: 409 }
  );
}
