import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const ALLOWED_EMAILS = new Set(["yueheng0816@gmail.com"]);

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";
  if (!ALLOWED_EMAILS.has(email)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const profession = searchParams.get("profession");
  const status = searchParams.get("status");
  const limit = Math.min(Number(searchParams.get("limit")) || 30, 100);
  const cursor = searchParams.get("cursor");

  const where: Record<string, unknown> = {};
  if (profession) where.profession = profession;
  if (status) where.status = status;

  const orders = await db.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    select: {
      id: true,
      plan: true,
      profession: true,
      gender: true,
      status: true,
      promptIds: true,
      outputPhotos: true,
      predictionIds: true,
      failedPredictions: true,
      errorMessages: true,
      completedPredictions: true,
      createdAt: true,
    },
  });

  const hasMore = orders.length > limit;
  if (hasMore) orders.pop();

  return NextResponse.json({
    orders,
    nextCursor: hasMore ? orders[orders.length - 1]?.id : null,
    total: await db.order.count({ where }),
  });
}
