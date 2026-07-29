import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { withTimeout } from "@/features/shared/lib/with-timeout";
import type { DashboardUsage } from "@/features/shared/types/dashboard-usage";

const DAY_IN_MS = 86_400_000;
const USAGE_TIMEOUT_MS = 4_000;

export type { DashboardUsage };

const DEFAULT_USAGE: DashboardUsage = {
  apiLimitCount: 0,
  isPro: false,
};

const fetchUsageForUser = async (userId: string): Promise<DashboardUsage> => {
  const [userApiLimit, userSubscription] = await Promise.all([
    prismadb.userApiLimit.findUnique({
      where: { userId },
      select: { count: true },
    }),
    prismadb.userSubscription.findUnique({
      where: { userId },
      select: {
        stripePriceId: true,
        stripeCurrentPeriodEnd: true,
      },
    }),
  ]);

  const isPro = Boolean(
    userSubscription?.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()
  );

  return {
    apiLimitCount: userApiLimit?.count ?? 0,
    isPro,
  };
};

export const getDashboardUsage = async (): Promise<DashboardUsage> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return DEFAULT_USAGE;
    }

    return await withTimeout(
      fetchUsageForUser(userId),
      USAGE_TIMEOUT_MS,
      "Dashboard usage query timed out"
    );
  } catch (error) {
    console.error("[DASHBOARD_USAGE]", error);
    return DEFAULT_USAGE;
  }
};
