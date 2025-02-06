"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DateRange = "this-day" | "past-week" | "past-3-months";

export default function DateRangeSelector() {
  const [selected, setSelected] = useState<DateRange>("this-day");

  return (
    <div className="inline-flex items-center bg-muted rounded-lg p-1 gap-1">
      <Button
        variant={selected === "this-day" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setSelected("this-day")}
        className={cn(
          "text-sm font-medium",
          selected === "this-day" ? "text-foreground" : "text-muted-foreground"
        )}
      >
        This Day
      </Button>
      <Button
        variant={selected === "past-week" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setSelected("past-week")}
        className={cn(
          "text-sm font-medium",
          selected === "past-week" ? "text-foreground" : "text-muted-foreground"
        )}
      >
        Past Week
      </Button>
      <Button
        variant={selected === "past-3-months" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setSelected("past-3-months")}
        className={cn(
          "text-sm font-medium",
          selected === "past-3-months"
            ? "text-foreground"
            : "text-muted-foreground"
        )}
      >
        Past 3 Months
      </Button>
    </div>
  );
}
