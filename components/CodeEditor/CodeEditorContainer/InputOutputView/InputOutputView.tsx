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

  return (
    <Tabs.Root
      className="flex flex-col w-full h-full bg-slate-100 dark:bg-nav-darkest"
      defaultValue="stdin"
      value={tabs[activeTab]}
      onValueChange={(value) => {
        setActiveTab(tabs.indexOf(value));
      }}
    >
      <div className="w-full overflow-hidden flex items-center min-h-[49px] space-x-8 dark:border-b-slate-700 border-b-slate-300 border-b py-3 px-5 dark:bg-nav-darkest bg-slate-200">
        <p className="text-sm text-slate-800 font-dm font-bold dark:text-white ">
          Testing
        </p>

        <Tabs.List
          className="flex w-full relative max-w-md items-center space-x-4"
          aria-label="Select content type"
        >
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab}
              className="cursor-pointer relative rounded-md px-2 group py-1 flex-1 text-sm font-dm leading-none text-slate-500 select-none hover:text-slate-700 data-[state=active]:text-slate-700 dark:hover:text-white dark:data-[state=active]:text-white outline-none"
              value={tab}
            >
              <div className="w-full h-full flex items-center justify-center z-20">
                {toTitleCase(tab)}
              </div>
              <div
                style={{
                  background:
                    activeTab === tabs.indexOf(tab)
                      ? `radial-gradient(ellipse, #10b9812b, transparent 70%)`
                      : "",
                }}
                className="absolute w-[80%] h-[400%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-[(calc(50%+40px))] scale-150 z-10"
              ></div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>
      <Tabs.Content className="w-full flex-1 p-4" value="stdin">
        <textarea
          className="w-full font-inter max-h-full p-2 border dark:bg-nav-dark border-slate-300 dark:border-slate-700 rounded-sm min-h-[10rem] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
          value={stdin}
          onChange={handleStdinChange}
        />
      </Tabs.Content>
      <Tabs.Content
        className="w-full h-full max-h-full p-4 relative overflow-y-scroll "
        value="output"
      >
        <CompileOutput
          accepted={isAcceptedOutput}
          compileBody={compilerOutput?.compilerBody}
          compileMessage={compilerOutput?.compilerMessage}
        />
      </Tabs.Content>
      <Tabs.Content
        className="w-full h-full p-4 overflow-y-scroll"
        value="submission"
      >
        <SubmitOutput results={submissionOutput} />
      </Tabs.Content>
    </Tabs.Root>
  );
};
