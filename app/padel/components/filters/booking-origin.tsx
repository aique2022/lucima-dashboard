import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlusIcon } from "lucide-react";

interface BookingOriginOption {
  label: string;
  value: string;
}

interface BookingOriginFilterProps {
  label: string;
  bookingOriginOptions: BookingOriginOption[];
  booking_Origin: string[];
  handleSelectBookingOrigin: (status: string, isChecked: boolean) => void;
}

export function BookingOriginFilter({
  label,
  bookingOriginOptions,
  booking_Origin,
  handleSelectBookingOrigin,
}: BookingOriginFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 border-dashed">
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {label}:{" "}
          {booking_Origin.length > 0 &&
            bookingOriginOptions
              .filter((option) => booking_Origin.includes(option.value))
              .map((option) => option.label)
              .join(", ")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="space-y-2 p-2">
          {bookingOriginOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer"
            >
              <Checkbox
                checked={booking_Origin.includes(option.value)}
                onCheckedChange={(checked: boolean) =>
                  handleSelectBookingOrigin(option.value, checked)
                }
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
