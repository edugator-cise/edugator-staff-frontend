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
  const TAGS = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  return (
    <Tabs.Root
      className="flex flex-col w-full h-full bg-slate-100 dark:bg-nav-darkest"
      defaultValue="stdin"
      value={tabs[activeTab]}
      onValueChange={(value) => {
        setActiveTab(tabs.indexOf(value));
      }}
    >
      <Tabs.List
        className="flex w-full relative p-2 max-w-md "
        aria-label="Select content type"
      >
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab}
            className="cursor-pointer px-2 border-b-slate-300 group flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-slate-700 data-[state=active]:text-slate-700 dark:hover:text-white dark:data-[state=active]:text-white outline-none"
            value={tab}
          >
            <div className="w-full h-full rounded-lg py-4 group-data-[state=active]:bg-slate-200 dark:group-data-[state=active]:bg-nav-dark hover:bg-slate-200 dark:hover:bg-nav-dark group-data-[state=active]:border dark:group-data-[state=active]:border-none border-slate-300">
              {toTitleCase(tab)}
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content className="w-full flex-1 p-4" value="stdin">
        <textarea
          className="w-full font-inter max-h-full p-2 border dark:bg-nav-dark border-slate-300 dark:border-slate-700 rounded-md min-h-[10rem] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
          value={stdin}
          onChange={handleStdinChange}
        />
      </Tabs.Content>
      <Tabs.Content
        className="w-full h-full max-h-full px-4 pb-4 relative overflow-y-scroll "
        value="output"
      >
        <CompileOutput
          accepted={isAcceptedOutput}
          compileBody={compilerOutput?.compilerBody}
          compileMessage={compilerOutput?.compilerMessage}
        />
      </Tabs.Content>
      <Tabs.Content
        className="w-full h-full px-4 pb-4 overflow-y-scroll"
        value="submission"
      >
        <SubmitOutput results={submissionOutput} />
      </Tabs.Content>
    </Tabs.Root>
  );
};
