"use client";

import { ArrowRight } from "lucide-react";

import { Card } from "@/features/shared/components/ui/card";
import { cn } from "@/lib/utils";
import type { ToolItem } from "@/features/dashboard/types/tool";

type Props = {
  tools: ToolItem[];
  onSelect: (href: string) => void;
};

export const DashboardToolList = ({ tools, onSelect }: Props) => {
  return (
    <div className="px-4 md:px-20 lg:px-32 space-y-4">
      {tools.map((tool) => (
        <Card
          onClick={() => onSelect(tool.href)}
          key={tool.href}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center gap-x-4">
            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn("w-8 h-8", tool.color)} />
            </div>
            <div className="font-semibold">{tool.label}</div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </Card>
      ))}
    </div>
  );
};
