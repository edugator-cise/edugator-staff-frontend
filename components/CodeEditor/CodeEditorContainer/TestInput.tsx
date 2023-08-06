import React from "react";

  interface Props {
    testInput: boolean | undefined;
  }

  export const TestInput = ({ testInput }: Props) => {
      return (
        <div>
          <textarea
            className="w-full font-inter max-h-full p-2 border dark:bg-nav-dark border-slate-300 dark:border-slate-700 rounded-sm min-h-[5rem] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
            placeholder="Enter your test input here"
          />
          <button className="w-full py-2 mt-2 bg-emerald-500 text-white rounded-md focus:outline-none hover:bg-emerald-500">
            Test Input
          </button>
          <div
            className="bg-slate-100 dark:bg-nav-darkest w-full mt-4 py-4 px-4 font-inter h-full rounded-sm bg-slate-100 border border-slate-300 dark:border-none min-h-[6rem]"
          >
            <p className="text-slate-900 dark:text-white">Resulting output will appear here.</p>
          </div>
        </div>
      );
  };