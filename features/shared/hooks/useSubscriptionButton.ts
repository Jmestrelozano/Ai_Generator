"use client";

import { useSubscribeStripe } from "@/features/shared/hooks/handler/useSubscribeStripe";

export const useSubscriptionButton = () => {
  const { loading, subscribe } = useSubscribeStripe();

  return {
    loading,
    onClick: subscribe,
  };
};
