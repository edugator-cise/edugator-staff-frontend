import { useEffect } from "react";
import { CompileOutput } from "../CompileOutput";
import { SubmitOutput } from "../SubmitOutput";
import { CompilerOutput } from "hooks/types";
import { IResultSubmission } from "../../types";
import * as Tabs from "@radix-ui/react-tabs";
import { toTitleCase } from "utils/textUtils";

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
  const handleStdinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setStdin(event.target.value);
  };

  const tabs = ["stdin", "output", "submission"];

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col w-full h-full font-dm bg-slate-100">
      <div className="w-full flex">
        <Tabs.Root
          className="flex flex-col w-full rounded-md"
          defaultValue="stdin"
          value={tabs[activeTab]}
          onValueChange={(value) => {
            setActiveTab(tabs.indexOf(value));
          }}
        >
          <div className="w-full flex">
            <Tabs.List
              className="shrink-0 flex w-1/2"
              aria-label="Select content type"
            >
              {tabs.map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  className="cursor-pointer px-2 py-2 border-b-slate-300 group transition flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-slate-700 data-[state=active]:text-slate-700 outline-none"
                  value={tab}
                >
                  <div className="w-full h-full rounded-lg py-4 group-data-[state=active]:bg-slate-200 hover:bg-slate-200 transition group-data-[state=active]:border border-slate-300">
                    {toTitleCase(tab)}
                  </div>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <div className="border-l h-full w-full border-b border-slate-300 bg-slate-200"></div>
          </div>
          <Tabs.Content className="w-full h-full p-2" value="stdin">
            <div className="w-full h-full">
              <textarea
                className="w-full h-full p-2 border border-slate-300 rounded-md max-h-[20rem] min-h-[10rem] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                value={stdin}
                onChange={handleStdinChange}
              />
            </div>
          </Tabs.Content>
          <Tabs.Content className="w-full h-full" value="output">
            <CompileOutput
              accepted={isAcceptedOutput}
              compileBody={compilerOutput?.compilerBody}
              compileMessage={compilerOutput?.compilerMessage}
            />
          </Tabs.Content>
          <Tabs.Content className="w-full h-full" value="submission">
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
