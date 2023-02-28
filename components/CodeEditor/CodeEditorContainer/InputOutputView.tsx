import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { styled } from "@mui/material/styles";
import { CompileOutput } from "./CompileOutput";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SubmitOutput } from "./SubmitOutput";
import { CompilerOutput } from "hooks/types";
import { IResultSubmission } from "../types";
import * as Tabs from "@radix-ui/react-tabs";

const TabBar = styled("div")(
  () => `
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: rgb(250,250,250);
`
);

export const InputOutputView = ({
  stdin,
  setStdin,
  compilerOutput,
  isAcceptedOutput,
  submissionOutput,
  activeTab,
  setActiveTab,
}: {
  stdin: string;
  setStdin: (stdin: string) => void;
  compilerOutput: CompilerOutput;
  isAcceptedOutput: boolean | undefined;
  submissionOutput: IResultSubmission[] | undefined;
  activeTab: number;
  setActiveTab: (activeTab: number) => void;
}) => {
  const handleChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStdinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setStdin(event.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full font-dm bg-slate-100">
      <div className="w-full flex">
        <Tabs.Root
          className="flex flex-col w-full rounded-md"
          defaultValue="stdin"
        >
          <Tabs.List
            className="shrink-0 flex w-full"
            aria-label="Select content type"
          >
            <Tabs.Trigger
              className="px-3 py-4 border-b-slate-300 border-b transition data-[state=active]:border-b-emerald-500 flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-slate-700 data-[state=active]:text-slate-700 data-[state=active]:bg-slate-200 outline-none cursor-default"
              value="stdin"
            >
              Stdin
            </Tabs.Trigger>
            <Tabs.Trigger
              className="px-3 py-4 border-b-slate-300 border-b whitespace-nowrap transition data-[state=active]:border-b-emerald-500 flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-slate-700 data-[state=active]:text-slate-700 data-[state=active]:bg-slate-200 outline-none cursor-default"
              value="output"
            >
              Compiler Output
            </Tabs.Trigger>
            <Tabs.Trigger
              className="px-3 py-4 border-b-slate-300 border-b transition data-[state=active]:border-b-emerald-500 flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-slate-700 data-[state=active]:text-slate-700 data-[state=active]:bg-slate-200 outline-none cursor-default"
              value="submission"
            >
              Submission
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="w-full h-full bg-red-500" value="stdin">
            <FormControl
              sx={{ width: "calc(100% - 20px)", height: "100%" }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-stdin"
                multiline
                minRows={6}
                value={stdin}
                onChange={handleStdinChange}
                aria-describedby="outlined-stdin-text"
                inputProps={{
                  "aria-label": "stdin",
                }}
              />
            </FormControl>
          </Tabs.Content>
          <Tabs.Content className="w-full h-full bg-blue-500" value="output">
            <CompileOutput
              accepted={isAcceptedOutput}
              compileBody={compilerOutput?.compilerBody}
              compileMessage={compilerOutput?.compilerMessage}
            />
          </Tabs.Content>
          <Tabs.Content
            className="w-full h-full bg-amber-500"
            value="submission"
          >
            <SubmitOutput results={submissionOutput} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
      {/* <TabBar sx={{ borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>
         <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="inherit"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "white",
              borderLeft: "2px solid transparent",
              borderRight: "2px solid transparent",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Tab disableRipple label="Stdin"></Tab>
          <Tab disableRipple label="Compiler Output"></Tab>
          <Tab disableRipple label="Submission"></Tab>
        </Tabs> 
      </TabBar> */}
      {/* <Box
        sx={{
          height: "100%",
          width: "100%",
          pt: 2,
          pr: 2,
          pl: 2,
          pb: 1.5,
          overflowY: "auto",
        }}
      >
        {activeTab === 0 ? (
          <FormControl
            sx={{ width: "calc(100% - 20px)", height: "100%" }}
            variant="outlined"
          >
            <OutlinedInput
              id="outlined-stdin"
              multiline
              minRows={6}
              value={stdin}
              onChange={handleStdinChange}
              aria-describedby="outlined-stdin-text"
              inputProps={{
                "aria-label": "stdin",
              }}
            />
          </FormControl>
        ) : activeTab === 1 ? (
          <>
            <CompileOutput
              accepted={isAcceptedOutput}
              compileBody={compilerOutput?.compilerBody}
              compileMessage={compilerOutput?.compilerMessage}
            />
          </>
        ) : (
          <SubmitOutput results={submissionOutput} />
        )}
      </Box> */}
    </div>
  );
};
