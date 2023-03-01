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
    <div className="w-full h-full max-h-full bg-slate-100 dark:bg-nav-darkest ">
      {accepted !== null && accepted !== undefined ? (
        <div className="w-full rounded-sm bg-slate-50 dark:bg-nav-darker flex flex-col p-4 space-y-2">
          <h1
            className={`text-2xl font-dm ${
              accepted ? "text-emerald-600" : "text-red-600"
            }`}
          >
            Compilation {accepted ? "Successful" : "Failed"}
          </h1>

          <div
            className={`bg-slate-100 dark:bg-nav-darkest w-full py-4 px-4 font-inter h-full rounded-sm ${
              accepted
                ? "bg-slate-100 border border-slate-300 dark:border-none"
                : "bg-red-500/10"
            }`}
          >
            <p
              className={`whitespace-pre-wrap ${
                accepted ? "text-slate-900 dark:text-white" : "text-red-600"
              }`}
            >
              {compileBody}
            </p>
          </div>
        </div>
      ) : (
        <div className="font-dm text-slate-900 dark:text-white bg-slate-50 dark:bg-nav-dark w-full h-full flex items-center justify-center text-center rounded-sm">
          Press Run to run code
        </div>
      )}
    </div>
  );
};
