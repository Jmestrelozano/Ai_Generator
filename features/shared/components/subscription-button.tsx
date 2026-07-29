"use client";

import { Zap } from "lucide-react";

import { Button } from "@/features/shared/components/ui/button";
import { useSubscriptionButton } from "@/features/shared/hooks/useSubscriptionButton";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const { loading, onClick } = useSubscriptionButton();

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      disabled={loading}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
