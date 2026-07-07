import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";
import { getPrediction, PHOTOS_PER_ORDER } from "@/lib/replicate";

/**
 * GET /api/orders/[id]/check
 *
 * Polls Replicate for pending predictions and updates the order.
 * Required for local dev because Replicate webhooks can't reach localhost.
 *
 * For each prediction:
 *   "succeeded" → save output to outputPhotos[i]
 *   "failed"    → leave empty
 *   other       → still processing, skip
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

  const order = await db.order.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      status: true,
      predictionIds: true,
      outputPhotos: true,
    },
  });

  if (!order) {
    return new NextResponse("Not found", { status: 404 });
  }

  const user = await ensureUser(userId);
  if (order.userId !== user.id) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Accept both "paid" and "generating" — trigger may have created predictions
  // but failed to update status (edge case)
  if (order.status !== "generating" && order.status !== "paid") {
    return NextResponse.json({ status: order.status, updated: false });
  }

  // Initialize a fixed-size array with empty strings.
  // Prevents sparse-array undefined entries that Prisma rejects.
  const totalSlots = order.predictionIds.length;
  const outputPhotos: string[] = new Array(totalSlots).fill("");
  let completed = 0;

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

  let newlyCompleted = 0;

  for (let i = 0; i < totalSlots; i++) {
    const predictionId = order.predictionIds[i];
    if (!predictionId) continue;

    // Already have output for this slot (restored above or from previous polls)
    if (outputPhotos[i]) continue;

    try {
      const prediction = await getPrediction(predictionId);
      if (!prediction) continue;

      if (prediction.status === "succeeded") {
        const output = Array.isArray(prediction.output)
          ? prediction.output[0]
          : prediction.output;
        if (typeof output === "string" && output.length > 0) {
          outputPhotos[i] = output;
          newlyCompleted++;
          completed++;
        }
      } else if (prediction.status === "failed") {
        // Keep as "" — already initialized, just count as done
        completed++;
      }
      // else: still "starting" or "processing" — skip
    } catch {
      // Network error polling this prediction — skip, try next poll
    }
  }

  // Update order if we got new results
  if (newlyCompleted > 0) {
    const allDone =
      completed >= PHOTOS_PER_ORDER ||
      completed >= order.predictionIds.filter(Boolean).length;

    await db.order.update({
      where: { id },
      data: {
        outputPhotos, // already clean — no undefined, no "__failed__"
        completedPredictions: completed,
        status: allDone ? "completed" : "generating",
      },
    });
  }

  return NextResponse.json({
    status: order.status,
    updated: newlyCompleted > 0,
    newlyCompleted,
    totalCompleted: completed,
  });
}
