"use client";

import { SettingsView } from "@/features/shared/components/SettingsView";

import { useDashboardUsage } from "@/features/dashboard/hooks/useDashboardUsage";

export default function SettingsPage() {
  const { isPro, isLoading } = useDashboardUsage();

  if (isLoading) {
    return (
      <div className="px-4 lg:px-8 py-8 text-sm text-muted-foreground">
        Loading subscription status...
      </div>
    );
  }

  return <SettingsView isPro={isPro} />;
}
