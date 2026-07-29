"use client";

import { useRouter } from "next/navigation";

import { useDashboardHome } from "@/features/dashboard/hooks/useDashboardHome";
import { DashboardToolList } from "@/features/dashboard/components/DashboardToolList";

export const DashboardHome = () => {
  const router = useRouter();
  const { tools } = useDashboardHome();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <DashboardToolList tools={tools} onSelect={(href) => router.push(href)} />
    </div>
  );
};
