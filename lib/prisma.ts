import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var isPgAvailableCached: boolean | undefined;
  // eslint-disable-next-line no-var
  var lastPgCheckTime: number | undefined;
}

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export async function isDatabaseConnected(): Promise<boolean> {
  const now = Date.now();
  // Cache connection state for 10 seconds to avoid blocking request loops
  if (
    globalThis.lastPgCheckTime &&
    now - globalThis.lastPgCheckTime < 10000 &&
    globalThis.isPgAvailableCached !== undefined
  ) {
    return globalThis.isPgAvailableCached;
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout connecting to PostgreSQL")), 1500)
    );
    await Promise.race([prisma.$queryRaw`SELECT 1`, timeoutPromise]);
    globalThis.isPgAvailableCached = true;
    globalThis.lastPgCheckTime = now;
    return true;
  } catch {
    globalThis.isPgAvailableCached = false;
    globalThis.lastPgCheckTime = now;
    return false;
  }
}
