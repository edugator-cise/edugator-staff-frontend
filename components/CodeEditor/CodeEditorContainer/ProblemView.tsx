import React from "react";
import { Markdown } from "components/shared/Markdown";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Typography, Grow } from "@mui/material";

interface Props {
  problemTitle: string;
  problemStatement: string;
}

export const ProblemView = ({ problemTitle, problemStatement }: Props) => {
  return (
    <ScrollArea.Root className="bg-slate-50 h-full w-full overflow-hidden">
      <ScrollArea.Viewport className="flex flex-col px-5 h-full w-full">
        <h1 className="text-4xl font-ambit font-semibold text-slate-900 mb-4 mt-12">
          {problemTitle}
        </h1>
        <Markdown markdownString={problemStatement} />
        <div className="h-12"></div>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 group bg-neutral-200 transition duration-[160ms] ease-out hover:bg-neutral-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-neutral-300 group-hover:bg-netral-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-white/20" />
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
};
