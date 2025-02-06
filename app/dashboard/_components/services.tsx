import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import Drop from "@/app/assets/svg/services/drop.svg";
import Food from "@/app/assets/svg/services/food.svg";
import Keep from "@/app/assets/svg/services/keep.svg";
import Wash from "@/app/assets/svg/services/wash.svg";

import Image from "next/image";

interface ServiceData {
  name: string;
  transactions: number;
  sales: number;
}

const services: ServiceData[] = [
  { name: "WASH", transactions: 3293, sales: 2000500.0 },
  { name: "DROP", transactions: 2941, sales: 1000500.0 },
  { name: "KEEP", transactions: 139, sales: 3050.0 },
  { name: "FOOD", transactions: 10, sales: 350.0 },
];

export default function ServiceCard() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Pandora Services
        </CardTitle>
        <CardDescription>Showing results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-sm text-muted-foreground">Service</div>
          <div className="text-sm text-muted-foreground">Transaction</div>
          <div className="text-sm text-muted-foreground">Sales</div>
        </div>
        {services.map((service, index) => (
          <div
            key={service.name}
            className={cn(
              "grid grid-cols-3 gap-4 py-3 items-center",
              index !== services.length - 1 && "border-b"
            )}
          >
            <div className="flex items-center gap-2">
              <span>{service.name}</span>
            </div>
            <div>{service.transactions.toLocaleString()}</div>
            <div>₱ {service.sales.toLocaleString()}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
