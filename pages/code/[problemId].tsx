import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import PlaygroundLayout from "components/PlaygroundLayout/PlaygroundLayout";
import "allotment/dist/style.css";
import { useGetProblem } from "hooks/problem/useGetProblem";
import ProblemView from "components/problem/student/ProblemView";

export default function CodeEditor() {
  const router = useRouter();
  const { problemId } = router.query;

  const {
    data: problemData,
    isLoading: problemLoading, //only for initial load
    isFetching: problemFetching,
    isError: problemError, // TODO add error handling and visual state
  } = useGetProblem({
    problemId: problemId as string,
  }); // pass in problemdata to one component in return (goal)

  if (problemFetching) {
    return <StudentLoadingState />;
  }

  if (problemData === undefined) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-nav-darkest">
        <h1 className="text-base font-dm text-slate-900 dark:text-white">
          Problem not found
        </h1>
      </div>
    );
  }

  return <ProblemView problem={problemData} />;
}

CodeEditor.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};

export const StudentLoadingState = () => (
  <div className="w-full h-full flex flex-col">
    <div className="w-full h-full flex">
      {/* Metadata */}
      <div className="h-full w-full bg-slate-100 border-r border-slate-300 p-4 flex flex-col items-start space-y-4">
        <div className="rounded-md h-12 w-80 bg-slate-300 animate-pulse"></div>
        <div className="flex items-center justify-center space-x-4">
          <div className="rounded-full h-6 w-24 bg-slate-300 animate-pulse"></div>
          <div className="rounded-full h-6 w-16 bg-slate-300 animate-pulse"></div>
          <div className="rounded-full h-6 w-20 bg-slate-300 animate-pulse"></div>
        </div>
        <div className="rounded-md w-56 h-4 bg-slate-300 animate-pulse !mt-12"></div>
        <div className="rounded-md w-80 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-96 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-48 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-24 h-4 animate-pulse"></div>
        <div className="rounded-md w-52 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-28 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-36 h-4 bg-slate-300 animate-pulse"></div>
      </div>
      <div className="h-full w-full flex flex-col">
        {/* Code Editor */}
        <div className="h-full w-full border-b border-slate-300 space-y-4 bg-slate-100 p-4 flex flex-col">
          <div className="w-full h-full rounded-md bg-gradient-to-b from-slate-300 to-slate-200 animate-pulse"></div>
          <div className="w-full flex justify-end items-center space-x-4">
            <div className="w-24 h-8 rounded-md bg-slate-300 animate-pulse"></div>
            <div className="w-24 h-8 rounded-md bg-slate-300 animate-pulse"></div>
          </div>
        </div>
        <div className="h-full w-full space-y-4 bg-slate-100 p-4 flex flex-col">
          <div className="w-full flex justify-start items-center space-x-4">
            <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
            <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
            <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
          </div>
          <div className="w-full h-full rounded-md bg-gradient-to-b to-slate-300 from-slate-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

{
  /* for mobile view
{isMobile ? (
        <div className="flex flex-col w-full h-full max-h-full divide-y divide-slate-300 dark:divide-slate-700">
          {mobilePanels.map((panel) => {
            return (
              <React.Fragment key={panel}>
                <div
                  key={panel}
                  className="w-full cursor-pointer h-12 min-h-[3rem] dark:bg-nav-dark flex px-5 items-center justify-between"
                  onClick={() => {
                    setMobileActivePanel(panel);
                  }}
                >
                  <p className="dark:text-white text-slate-900">
                    {toTitleCase(panel)}
                  </p>
                  <ChevronDownIcon
                    className={`transition text-slate-800 dark:text-white ease-[cubic-bezier(0.87,_0,_0.13,_1)] duration-300 ${
                      mobileActivePanel === panel ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimateHeight
                  contentClassName="h-full"
                  height={mobileActivePanel === panel ? "100%" : 0}
                  className="w-full dark:bg-nav-darkest bg-slate-100"
                >
                  {panel === "problem" ? (
                    <div className="w-full h-full">
                      <div className="w-full dark:border-b-slate-700 border-b-slate-300 pb-3 border-b pt-4 pl-5 pr-3 dark:bg-nav-darkest bg-slate-200">
                        <p className="text-sm text-slate-800 font-dm font-bold dark:text-white">
                          Problems
                          <span className="text-slate-500 dark:text-slate-400 font-normal truncate">
                            &nbsp;&nbsp;&gt;&nbsp;&nbsp;{currentProblem?.title}
                          </span>
                        </p>
                      </div>
                      <div className="w-full h-full overflow-y-scroll">
                        <ProblemView
                          problemTitle={currentProblem?.title}
                          problemStatement={currentProblem?.statement}
                        />
                      </div>
                    </div>
                  ) : panel === "editor" ? (
                    <CodeEditorView
                      parseFile={parseFile}
                      handleCodeReset={handleCodeReset}
                      editorRef={editorRef}
                      onMount={handleEditorMount}
                      isSubmissionRunning={isSubmissionRunning}
                      runCode={runCode}
                      submitCode={submitCode}
                      code={currentProblem?.code?.body}
                      templatePackage={currentProblem?.templatePackage}
                      currentProblem={currentProblem}
                      stdin={stdin}
                    />
                  ) : (
                    <div className="w-full h-full">
                      <InputOutputView
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        submissionOutput={submissionOutput}
                        stdin={defaultStdin}
                        setStdin={setStdin}
                        compilerOutput={compilerOutput}
                        isAcceptedOutput={isAcceptedOutput}
                      />
                    </div>
                  )}
                </AnimateHeight>
              </React.Fragment>
            );
          })}
        </div>
      ) : ( */
}
