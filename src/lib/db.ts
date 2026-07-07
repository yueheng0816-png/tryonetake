import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  return new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
  });
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/**
 * Get or create a DB User from a Clerk userId.
 * Returns the internal User.id (cuid) used for Order relations.
 */
export async function ensureUser(clerkId: string, email?: string) {
  let user = await db.user.findUnique({ where: { clerkId } });
  if (!user) {
    user = await db.user.create({
      data: { clerkId, email: email ?? "" },
    });
  } else if (email && user.email !== email) {
    user = await db.user.update({
      where: { clerkId },
      data: { email },
    });
  }
  return user;
}
