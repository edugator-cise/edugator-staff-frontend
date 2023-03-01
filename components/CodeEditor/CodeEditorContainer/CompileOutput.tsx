import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Props {
  accepted: boolean | undefined;
  compileMessage: string;
  compileBody: string;
}
export const CompileOutput = ({
  accepted,
  compileMessage,
  compileBody,
}: Props) => {
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-nav-darkest">
      {accepted === true ? (
        <div className="w-full h-full rounded-md bg-slate-50 dark:bg-nav-dark flex flex-col p-4 space-y-2">
          <h1 className="text-2xl font-dm text-emerald-600">
            Compilation Successful
          </h1>

          <ScrollArea.Root className="bg-slate-100 dark:bg-nav-darkest h-full w-full overflow-hidden border border-slate-300 dark:border-slate-800 rounded-sm">
            <ScrollArea.Viewport
              className="py-4 px-4 font-dm h-full w-full"
              asChild
            >
              <p className="whitespace-pre-wrap">{compileBody}</p>
              <ScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 group bg-neutral-200 transition duration-[160ms] ease-out hover:bg-neutral-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 bg-neutral-300 group-hover:bg-netral-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="bg-white/20" />
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </div>
      ) : accepted === false ? (
        <div className="w-full h-full rounded-md bg-slate-50 dark:bg-nav-dark flex flex-col p-4 space-y-2">
          <h1 className="text-2xl font-dm text-red-600">{compileMessage}</h1>
          <ScrollArea.Root className="bg-red-500/10 dark:bg-nav-darkest h-full w-full overflow-hidden">
            <ScrollArea.Viewport
              className="py-4 px-4 font-dm h-full w-full"
              asChild
            >
              <p className="whitespace-pre-wrap text-red-600">{compileBody}</p>
              <ScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 group bg-neutral-200 transition duration-[160ms] ease-out hover:bg-neutral-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 bg-neutral-300 group-hover:bg-netral-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="bg-white/20" />
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </div>
      ) : (
        <div className="font-dm text-slate-900 dark:text-white bg-slate-50 dark:bg-nav-dark w-full h-full flex items-center justify-center text-center rounded-md">
          Press Run to run code
        </div>
      )}
    </div>
  );
};
