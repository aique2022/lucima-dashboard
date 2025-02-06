import { format, isValid } from "date-fns";

interface CalendarCellProps {
  date: Date | string | null | undefined;
}

export function CalendarCell({ date }: CalendarCellProps) {
  if (!date) {
    return <div className="text-gray-500 text-sm">N/A</div>;
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!isValid(dateObj)) {
    return <div className="text-gray-500 text-sm"></div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="w-20 overflow-hidden rounded-lg shadow-md relative">
        <div className="bg-teal-600 text-white text-center py-1 text-xs font-semibold uppercase">
          {format(dateObj, "MMMM yyyy")} {/* Month and Year */}
        </div>

        <div className="bg-white border border-gray-200 border-t-0">
          <div className="text-2xl font-bold text-gray-800 text-center py-1">
            {format(dateObj, "d")} {/* Day */}
          </div>

          <div className="text-xs font-medium text-gray-600 text-center pb-1 border-t border-gray-100">
            {format(dateObj, "EEEE")} {/* Weekday */}
          </div>

          <div className="text-xs font-medium text-gray-500 text-center py-1 border-t border-gray-100">
            {format(dateObj, "hh:mm a")} {/* Time */}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-100 transform rotate-[-45deg] origin-bottom-right shadow-[-1px_-1px_2px_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  );
}
