import { NextResponse } from "next/server";

import { getDashboardUsage } from "@/features/shared/lib/dashboard-usage";

export const dynamic = "force-dynamic";
export const maxDuration = 10;

export async function GET() {
  const usage = await getDashboardUsage();
  return NextResponse.json(usage);
}
