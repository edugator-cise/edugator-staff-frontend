import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import PlaygroundLayout from "components/layouts/PlaygroundLayout";
import "allotment/dist/style.css";
import { useGetProblem } from "hooks/problem/useGetProblem";
import ProblemView from "components/problem/student/ProblemView";
import { StudentProblemLoadingState } from "pages/courses/[courseId]/problem/[problemId]";

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
    return <StudentProblemLoadingState />;
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
