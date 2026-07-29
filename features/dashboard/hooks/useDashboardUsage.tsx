"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { DashboardUsage } from "@/features/shared/types/dashboard-usage";

type DashboardUsageContextValue = DashboardUsage & {
  isLoading: boolean;
};

const DashboardUsageContext = createContext<DashboardUsageContextValue>({
  apiLimitCount: 0,
  isPro: false,
  isLoading: true,
});

export const DashboardUsageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [usage, setUsage] = useState<DashboardUsageContextValue>({
    apiLimitCount: 0,
    isPro: false,
    isLoading: true,
  });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const loadUsage = async () => {
      try {
        const response = await fetch("/api/usage", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load usage");
        }

        const data = (await response.json()) as DashboardUsage;

        if (!cancelled) {
          setUsage({
            apiLimitCount: data.apiLimitCount ?? 0,
            isPro: Boolean(data.isPro),
            isLoading: false,
          });
        }
      } catch (error) {
        if (cancelled || (error instanceof DOMException && error.name === "AbortError")) {
          return;
        }

        console.error("[DASHBOARD_USAGE_CLIENT]", error);

        if (!cancelled) {
          setUsage({
            apiLimitCount: 0,
            isPro: false,
            isLoading: false,
          });
        }
      }
    };

    void loadUsage();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return (
    <DashboardUsageContext.Provider value={usage}>
      {children}
    </DashboardUsageContext.Provider>
  );
};

export const useDashboardUsage = () => useContext(DashboardUsageContext);
