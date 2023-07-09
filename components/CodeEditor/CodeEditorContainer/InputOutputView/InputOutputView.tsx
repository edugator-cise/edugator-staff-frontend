import { CompileOutput } from "../CompileOutput";
import { SubmitOutput } from "../SubmitOutput";
import { CompilerOutput } from "hooks/types";
import { IResultSubmission } from "../../types";
import * as Tabs from "@radix-ui/react-tabs";
import { toTitleCase } from "utils/textUtils";
import { useEffect, useState } from "react";

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
    setInput(event.target.value);
    setStdin(event.target.value);
  };

  // ensure that the input is updated when the stdin prop changes
  const [input, setInput] = useState(stdin);
  useEffect(() => {
    // on mount, set the input to the stdin prop so CodeEditorView can update the stdin prop
    setInput(stdin);
    setStdin(stdin);
  }, [stdin]);

  const tabs = ["stdin", "output", "submission"];

  return (
    <Tabs.Root
      className="flex flex-col w-full h-full bg-[#d3d9df] p-2 pl-1 pt-1"
      defaultValue="stdin"
      value={tabs[activeTab]}
      onValueChange={(value) => {
        setActiveTab(tabs.indexOf(value));
      }}
    >
      <div className="w-full overflow-hidden flex items-center rounded-t-md py-1 min-h-[41px] max-h-[41px] space-x-8 dark:border-b-slate-700 border-b-slate-300 border-b px-5 dark:bg-nav-darkest bg-slate-100">
        <p className="text-xs font-dm font-bold dark:text-white">Testing</p>

        <Tabs.List
          className="flex w-fit relative items-center space-x-4"
          aria-label="Select view"
        >
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab}
              asChild
              className="cursor-pointer after:h-full after:w-full after:absolute after:rounded-md after:scale-75 after:transition hover:after:scale-100 hover:after:bg-slate-300/50 z-0 after:-z-10 px-2 relative rounded-md group py-3 flex-1 text-sm font-dm leading-none text-slate-500 select-none hover:text-slate-700 data-[state=active]:bg-slate-300 data-[state=active]:text-slate-900 dark:hover:text-white dark:data-[state=active]:text-white outline-none"
              value={tab}
            >
              <div className="h-full flex items-center justify-center z-20 font-mono text-[10px]">
                {toTitleCase(tab)}
              </div>
              {/* <div
                style={{
                  background:
                    activeTab === tabs.indexOf(tab)
                      ? `radial-gradient(ellipse, #10b9812b, transparent 70%)`
                      : "",
                }}
                className="absolute w-[80%] h-[400%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-[(calc(50%+40px))] scale-150 z-10"
              ></div> */}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>
      <Tabs.Content
        className="w-full rounded-b-md flex-1 bg-white p-4 h-full"
        value="stdin"
      >
        <textarea
          className="w-full text-sm bg-slate-50 !max-h-full font-inter p-2 border dark:bg-nav-dark border-slate-300 dark:border-slate-700 rounded-sm min-h-[10rem] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
          value={input}
          onChange={handleStdinChange}
        />
      </Tabs.Content>
      <Tabs.Content
        className="w-full h-full rounded-b-md max-h-full p-4 bg-white relative overflow-y-scroll "
        value="output"
      >
        <CompileOutput
          accepted={isAcceptedOutput}
          compileBody={compilerOutput?.compilerBody}
          compileMessage={compilerOutput?.compilerMessage}
        />
      </Tabs.Content>
      <Tabs.Content
        className="w-full h-full rounded-b-md p-4 bg-white overflow-y-scroll"
        value="submission"
      >
        <SubmitOutput results={submissionOutput} />
      </Tabs.Content>
    </Tabs.Root>
  );
};
