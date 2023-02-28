import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import theme from "constants/theme";
import { colors } from "constants/config";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const OutputPaper = styled("div")(
  ({ theme }) => `
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  line-height: 20px;
  font-weight: 400;
  border-radius: 0;
  overflow: auto;
  background-color: #f7f9fa;
  border-radius: 4px;
  margin-right: ${theme.spacing(1)};
  margin-left: ${theme.spacing(1)};
`
);

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
    <div className="w-full h-full bg-slate-100 p-2 ">
      <div className="w-full h-full rounded-md bg-slate-50 px-2 flex flex-col py-4 space-y-2">
        {accepted === true ? (
          <>
            <h1 className="text-2xl font-dm text-emerald-600">
              Compilation Successful
            </h1>

            <ScrollArea.Root className="bg-slate-100 h-full w-full overflow-hidden border border-slate-300 rounded-sm">
              <ScrollArea.Viewport className=" py-5 px-5 h-full w-full" asChild>
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
          </>
        ) : accepted === false ? (
          <>
            <h1 className="text-2xl font-dm text-red-600">{compileMessage}</h1>
            <ScrollArea.Root className="bg-red-500/10 h-full w-full overflow-hidden">
              <ScrollArea.Viewport className=" py-5 px-5 h-full w-full" asChild>
                <p className="whitespace-pre-wrap text-red-600">
                  {compileBody}
                </p>
                <ScrollArea.Scrollbar
                  className="flex select-none touch-none p-0.5 group bg-neutral-200 transition duration-[160ms] ease-out hover:bg-neutral-300 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="flex-1 bg-neutral-300 group-hover:bg-netral-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-white/20" />
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </>
        ) : (
          <OutputPaper>Press Run to run code</OutputPaper>
        )}
      </div>
    </div>
  );
};
