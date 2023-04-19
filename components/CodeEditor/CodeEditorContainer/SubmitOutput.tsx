import React from "react";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { IResultSubmission } from "../types";
const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

interface Props {
  results: IResultSubmission[] | undefined;
}

// TODO: change scrollbar styling

export const SubmitOutput = ({ results }: Props) => {
  if (results) {
    return (
      <table className="w-full rounded table-auto font-inter bg-white dark:bg-nav-darkest border-collapse">
        <thead className="sticky top-0 pt-4 border-t font-dm bg-slate-200 dark:bg-nav-darker rounded-t-md w-full">
          <tr>
            <th
              className="p-3 border border-slate-100 dark:border-slate-700 text-xs uppercase"
              align="left"
            >
              Input
            </th>
            <th
              className="p-3 border border-slate-100 dark:border-slate-700 text-xs uppercase"
              align="left"
            >
              Output
            </th>
            <th
              className="p-3 border border-slate-100 dark:border-slate-700 text-xs uppercase"
              align="left"
            >
              Expected
            </th>
            <th
              className="p-3 border border-slate-100 dark:border-slate-700 text-xs uppercase"
              align="left"
            >
              Hint
            </th>
            <th
              className="p-3 border border-slate-100 dark:border-slate-700 text-xs uppercase"
              align="center"
            >
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((row: IResultSubmission, index: number) => (
            <tr key={index}>
              <th className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap">
                {row.stdin}
              </th>
              <th
                className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                align="left"
              >
                {row.output}
              </th>
              <th
                className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                align="left"
              >
                {row.expectedOutput}
              </th>
              <th
                className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                align="left"
              >
                {row.hint}
              </th>
              <th
                className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                align="center"
              >
                {row.result ? (
                  <CheckCircle style={{ color: "#2E7D32" }} />
                ) : (
                  <Cancel style={{ color: "#DC143C" }} />
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="font-dm text-slate-900 dark:text-white bg-slate-50 dark:bg-nav-dark w-full h-full flex items-center justify-center text-center rounded-sm">
      Press Submit to submit code
    </div>
  );
};

/**
 * {/* <table className="block w-full rounded-md table-auto font-dm bg-slate-50 border-collapse h-full">
              <thead className="sticky top-0 border-t bg-slate-200 divide-yellow-200 rounded-t-md w-full">
                <tr>
                  <th
                    className="py-3 px-2 border border-slate-100 dark:border-slate-700 text-xs uppercase"
                    align="left"
                  >
                    Input
                  </th>
                  <th
                    className="py-3 px-2 border border-slate-100 dark:border-slate-700 text-xs uppercase"
                    align="left"
                  >
                    Output
                  </th>
                  <th
                    className="py-3 px-2 border border-slate-100 dark:border-slate-700 text-xs uppercase"
                    align="left"
                  >
                    Expected
                  </th>
                  <th
                    className="py-3 px-2 border border-slate-100 dark:border-slate-700 text-xs uppercase"
                    align="left"
                  >
                    Hint
                  </th>
                  <th
                    className="py-3 px-2 border border-slate-100 dark:border-slate-700 text-xs uppercase"
                    align="center"
                  >
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((row: IResultSubmission, index: number) => (
                  <tr key={index}>
                    <th className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap">
                      {row.stdin}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.output}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.expectedOutput}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.hint}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="center"
                    >
                      {row.result ? (
                        <CheckCircle style={{ color: "#2E7D32" }} />
                      ) : (
                        <Cancel style={{ color: "#DC143C" }} />
                      )}
                    </th>
                  </tr>
                ))}
                {results.map((row: IResultSubmission, index: number) => (
                  <tr key={index}>
                    <th className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap">
                      {row.stdin}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.output}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.expectedOutput}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.hint}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="center"
                    >
                      {row.result ? (
                        <CheckCircle style={{ color: "#2E7D32" }} />
                      ) : (
                        <Cancel style={{ color: "#DC143C" }} />
                      )}
                    </th>
                  </tr>
                ))}
                {results.map((row: IResultSubmission, index: number) => (
                  <tr key={index}>
                    <th className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap">
                      {row.stdin}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.output}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.expectedOutput}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="left"
                    >
                      {row.hint}
                    </th>
                    <th
                      className="border-slate-100 dark:border-slate-700 text-sm font-normal p-3 text-left border whitespace-pre-wrap"
                      align="center"
                    >
                      {row.result ? (
                        <CheckCircle style={{ color: "#2E7D32" }} />
                      ) : (
                        <Cancel style={{ color: "#DC143C" }} />
                      )}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table> */
