"use client";

import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsCardProps {
  label: string;
  count: string | number; // Accepts both strings and numbers
}

export default function AnalyticsCard({ label, count }: AnalyticsCardProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-cyan-100">
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle className="capitalize text-[20px] font-semibold text-slate-400">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-center space-y-0 pb-">
        <div className="text-[40px] font-bold text-slate-400 ">{count}</div>
      </CardContent>
    </Card>
  );
}
