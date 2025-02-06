import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlusIcon } from "lucide-react";

interface LocationOption {
  label: string;
  value: string;
}

interface LocationFilterProps {
  label: string;
  locationOptions: LocationOption[];
  locData: string[];
  handleSelectLocation: (status: string, isChecked: boolean) => void;
}

export function LocationFilter({
  label,
  locationOptions,
  locData,
  handleSelectLocation,
}: LocationFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 border-dashed">
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {label}:{" "}
          {locData.length > 0 &&
            locationOptions
              .filter((option) => locData.includes(option.value))
              .map((option) => option.label)
              .join(", ")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2 max-h-[60vh] overflow-y-auto">
          {locationOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer"
            >
              <Checkbox
                checked={locData.includes(option.value)}
                onCheckedChange={(checked: boolean) =>
                  handleSelectLocation(option.value, checked)
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
