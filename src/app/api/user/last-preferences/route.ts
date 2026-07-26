import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Get the user's most recent order to prefill preferences
  const lastOrder = await db.order.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      gender: true,
      profession: true,
      specificRole: true,
    },
  });

  if (!lastOrder) {
    return NextResponse.json({
      gender: null,
      profession: null,
      specificRole: null,
    });
  }

  return NextResponse.json({
    gender: lastOrder.gender,
    profession: lastOrder.profession,
    specificRole: lastOrder.specificRole,
  });
}
