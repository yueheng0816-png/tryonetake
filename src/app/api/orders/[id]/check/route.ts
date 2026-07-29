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
    // Also accept "completed" if outputPhotos is corrupted or has gaps —
    // webhook delivery races, transferToBlob failures, or the old race
    // condition can all leave some slots empty even though predictions
    // completed. We detect this by checking whether there are prediction
    // slots that haven't been filled with a usable image URL.
    const validOutputCount = order.outputPhotos.filter(Boolean).length;
    const blobOutputCount = order.outputPhotos.filter(
      (url: string) => url && url.includes("public.blob.vercel-storage.com")
    ).length;
    const expectedSlots = Math.max(
      order.predictionIds.length,
      order.completedPredictions,
      PHOTOS_PER_ORDER
    );
    const needsRecovery =
      order.status === "completed" &&
      order.completedPredictions > 0 &&
      validOutputCount < expectedSlots;
    const needsBlobTransfer =
      validOutputCount > 0 && blobOutputCount < validOutputCount;

    if (
      order.status !== "generating" &&
      order.status !== "paid" &&
      !needsRecovery &&
      !needsBlobTransfer
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

    // ── Phase: Transfer Replicate CDN URLs → Vercel Blob ─────
    // Webhook handler stores Replicate CDN URLs instantly (to stay within
    // Vercel Hobby's 10 s timeout). This phase upgrades them to permanent
    // Vercel Blob URLs, limited to N per call to keep each poll fast.
    //
    // If the CDN URL has already expired (transferToBlob fails to download),
    // we try URL reconstruction: the file may have been uploaded to Blob by
    // a previous transferToBlob attempt whose DB update failed (optimistic-
    // lock exhaustion). In that case the Blob file exists — we just need to
    // reconstruct the URL from the known pattern and verify it with a HEAD.
    let blobTransferred = 0;
    const MAX_BLOB_TRANSFERS_PER_CALL = 5;

    // Helper: find any existing Blob URL to extract the base pattern
    const findBlobBase = (): string | null => {
      const blob = outputPhotos.find(
        (u: string) => u && u.includes("public.blob.vercel-storage.com")
      );
      if (!blob) return null;
      const match = blob.match(/^(.+\/outputs\/[^/]+\/)/);
      return match ? match[1] : null;
    };

    if (needsBlobTransfer || needsRecovery) {
      for (let i = 0; i < totalSlots; i++) {
        if (blobTransferred >= MAX_BLOB_TRANSFERS_PER_CALL) break;
        const url = outputPhotos[i];
        if (!url || url.includes("public.blob.vercel-storage.com")) continue;

        try {
          const blobUrl = await transferToBlob(url, id, i);
          if (blobUrl && blobUrl.includes("public.blob.vercel-storage.com")) {
            outputPhotos[i] = blobUrl;
            blobTransferred++;
            continue; // success — next slot
          }
        } catch {
          // Download failed — CDN URL may be expired, try reconstruction
        }

        // ── Fallback: reconstruct Blob URL from known pattern ──
        // Only attempt if we have at least one working Blob URL to
        // extract the store ID from.
        const base = findBlobBase();
        if (base) {
          const reconstructed = `${base}${i}.jpg`;
          try {
            const head = await fetch(reconstructed, { method: "HEAD" });
            if (head.ok) {
              outputPhotos[i] = reconstructed;
              blobTransferred++;
              console.log(
                `[OneTake] Reconstructed Blob URL for slot ${i}: ${reconstructed.slice(0, 80)}…`
              );
              continue;
            }
          } catch {
            // HEAD failed — file doesn't exist in Blob either, keep original
          }
        }
        // Both transfer and reconstruction failed — keep original URL,
        // retry next poll cycle (transferToBlob may succeed later)
      }

      if (blobTransferred > 0) {
        console.log(
          `[OneTake] Blob transfer: ${blobTransferred} URLs migrated for ${id}`
        );
      }
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
    if (newlyCompleted > 0 || newFailures > 0 || blobTransferred > 0) {
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
