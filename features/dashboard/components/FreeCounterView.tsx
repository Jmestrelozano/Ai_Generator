"use client";

import { Zap } from "lucide-react";

import { MAX_FREE_COUNTS } from "@/features/shared/constants";
import { Card, CardContent } from "@/features/shared/components/ui/card";
import { Button } from "@/features/shared/components/ui/button";
import { Progress } from "@/features/shared/components/ui/progress";

type Props = {
  apiLimitCount: number;
  onUpgrade: () => void;
};

export const FreeCounterView = ({ apiLimitCount, onUpgrade }: Props) => {
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button onClick={onUpgrade} variant="premium" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
