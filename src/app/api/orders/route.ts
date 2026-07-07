import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, ensureUser } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Ensure user exists (maps Clerk userId → internal User.id)
  const user = await ensureUser(userId);

  const orders = await db.order.findMany({
    where: { userId: user.id }, // Query by internal User.id
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      status: true,
      plan: true,
      amount: true,
      outputPhotos: true,
      completedPredictions: true,
      createdAt: true,
    },
    take: 20,
  });

  return NextResponse.json({ orders });
}
