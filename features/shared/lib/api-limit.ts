import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/features/shared/constants";

export const incrementApiLimit = async () => {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  try {
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId: userId },
    });

    if (userApiLimit) {
      await prismadb.userApiLimit.update({
        where: { userId: userId },
        data: { count: userApiLimit.count + 1 },
      });
    } else {
      await prismadb.userApiLimit.create({
        data: { userId: userId, count: 1 },
      });
    }
  } catch (error) {
    console.error("[INCREMENT_API_LIMIT]", error);
  }
};

export const checkApiLimit = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  try {
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId: userId },
    });

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("[CHECK_API_LIMIT]", error);
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = await auth();

  if (!userId) {
    return 0;
  }

  try {
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: {
        userId,
      },
    });

    if (!userApiLimit) {
      return 0;
    }

    return userApiLimit.count;
  } catch (error) {
    console.error("[GET_API_LIMIT_COUNT]", error);
    return 0;
  }
};
