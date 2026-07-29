"use client";

import { useFreeCounter } from "@/features/dashboard/hooks/useFreeCounter";
import { FreeCounterView } from "@/features/dashboard/components/FreeCounterView";

export const FreeCounter = ({
  isPro = false,
  apiLimitCount = 0,
}: {
  isPro: boolean;
  apiLimitCount: number;
}) => {
  const { mounted, onUpgrade } = useFreeCounter();

  if (!mounted || isPro) {
    return null;
  }

  return (
    <FreeCounterView apiLimitCount={apiLimitCount} onUpgrade={onUpgrade} />
  );
};
