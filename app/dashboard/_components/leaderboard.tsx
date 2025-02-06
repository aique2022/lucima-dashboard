"use client";

import { Medal } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationData {
  rank: number;
  location: string;
  transactions: number;
}

const locations: LocationData[] = [
  { rank: 1, location: "Serendra", transactions: 3293 },
  { rank: 2, location: "Location 2", transactions: 2032 },
  { rank: 3, location: "Location 3", transactions: 1001 },
];

export default function LocationLeaderboard() {
  const [view, setView] = useState<"highest" | "lowest">("highest");

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            Location Leaderboard
          </CardTitle>
          <CardDescription>Showing results from this day</CardDescription>
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={view === "highest" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("highest")}
          >
            Highest
          </Button>
          <Button
            variant={view === "lowest" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("lowest")}
          >
            Lowest
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-sm text-muted-foreground">Ranking</div>
          <div className="text-sm text-muted-foreground">Location</div>
          <div className="text-sm text-muted-foreground">
            No. of Transaction
          </div>
        </div>
        {locations.map((location) => (
          <div
            key={location.rank}
            className={cn(
              "grid grid-cols-3 gap-4 py-3 rounded-lg dark:bg-transparent",
              location.rank === 1 && "bg-amber-50",
              location.rank === 2 && "bg-slate-50",
              location.rank === 3 && "bg-orange-50"
            )}
          >
            <div className="flex items-center gap-2 pl-2">
              <span>{location.rank}</span>
              <Medal
                className={cn(
                  "h-4 w-4",
                  location.rank === 1 && "text-amber-500 fill-amber-500",
                  location.rank === 2 && "text-slate-400 fill-slate-400",
                  location.rank === 3 && "text-orange-400 fill-orange-400"
                )}
              />
            </div>
            <div>{location.location}</div>
            <div>{location.transactions.toLocaleString()}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
