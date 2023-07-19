import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-4 ${className} font-dm`}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-6 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label:
          "text-sm font-medium underline underline-offset-2 decoration-blue-500",
        nav: "space-x-1 flex items-center",
        nav_button:
          "border border-slate-400 bg-white rounded-md flex items-center justify-center hover:bg-slate-200 transition hover:text-slate-800 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-slate-500 rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-200 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "hover:bg-slate-200 rounded-md transition hover:text-slate-800 h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        day_selected:
          "!bg-nav-darkest transition !rounded-md !text-slate-50 hover:!bg-nav-darkest hover:!text-slate-50 focus:bg-nav-darkest focus:text-slate-50",
        day_today: "bg-slate-200 text-slate-800",
        day_outside: "text-slate-400 opacity-50 !transition-none",
        day_disabled: "text-slate-500 opacity-50",
        day_range_middle:
          "aria-selected:!bg-slate-200 !rounded-none aria-selected:!text-slate-800",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon className=" !text-slate-900 h-4 w-4" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRightIcon className=" !text-slate-900 h-4 w-4" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
