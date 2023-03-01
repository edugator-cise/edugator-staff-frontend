import React from "react";
import { Markdown } from "components/shared/Markdown";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Props {
  problemTitle: string;
  problemStatement: string;
}

export const ProblemView = ({ problemTitle, problemStatement }: Props) => {
  return (
    <div className="bg-slate-50 flex flex-col px-5 rounded-sm w-full dark:bg-nav-darker h-full mb-4 overflow-y-scroll">
      <h1 className="text-3xl underline decoration-emerald-500 underline-offset-4 font-ambit font-semibold text-slate-900 dark:text-slate-100 mb-4 mt-8">
        {problemTitle}
      </h1>
      <Markdown markdownString={problemStatement} />
      <div className="h-12 w-full min-h-[3rem]"></div>
    </div>
  );
};
