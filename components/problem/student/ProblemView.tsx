import React, { ReactNode, useRef, useState } from "react";
import { useRouter } from "next/router";
import PlaygroundLayout from "components/layouts/PlaygroundLayout";
import { CodeEditorView } from "components/problem/student/CodeEditorView";
import { InputOutputView } from "components/problem/student/InputOutputView";
import "allotment/dist/style.css";
import { useRunCode } from "hooks/useRunCode";
import dynamic from "next/dynamic";
import { AllotmentProps } from "allotment";
import * as monaco from "monaco-editor";
import { Problem } from "hooks/problem/useGetProblem";
import MetadataView from "components/problem/student/MetadataView";

const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

export default function ProblemView({
  problem,
}: {
  problem: Problem | undefined;
}) {
  const router = useRouter();

  const locationState = router.asPath;

  const [stdin, setStdin] = useState<string>("");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const {
    compilerOutput,
    isAcceptedOutput,
    runCode,
    isSubmissionRunning,
    submissionOutput,
    submitCode,
    activeTab,
    setActiveTab,
  } = useRunCode(locationState);

  const handleCodeReset = (newCode: string) => {
    editorRef.current?.setValue(newCode);
    /* setEditorCode(newCode); */
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const parseFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("parseFile Start");
    event.preventDefault();
    const reader = new FileReader();
    if (event.target && event.target.files) {
      reader.readAsText(event.target.files[0]);
      reader.onload = async (event) => {
        const text = event.target?.result;
        console.log("text", text);
        editorRef.current?.setValue(text as string);
      };
      // Reset the input value after reading the file
      if (event.target) {
        (event.target as HTMLInputElement).value = "";
      }
    }
  };

  return (
    <div className="w-full h-full bg-gray-200 dark:bg-slate-950 relative student-view-holder">
      {/* <AIChat /> */}
      <Allotment
        separator={false}
        sizes={[310, 350]}
        snap={true}
        minSize={400}
        className="code-editor-allotment"
      >
        <div className="w-full flex flex-col h-full relative">
          <MetadataView problem={problem as Problem} />
        </div>

        <Allotment
          sizes={[100, 100]}
          vertical
          snap={false}
          minSize={300}
          separator={false}
          className="relative"
        >
          <CodeEditorView
            parseFile={parseFile}
            handleCodeReset={handleCodeReset}
            editorRef={editorRef}
            onMount={handleEditorMount}
            isSubmissionRunning={isSubmissionRunning}
            runCode={runCode}
            submitCode={submitCode}
            problem={problem as Problem}
            stdin={stdin}
          />

          <InputOutputView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            submissionOutput={submissionOutput}
            stdin={problem?.testCases?.at(0)?.input || ""}
            setStdin={setStdin}
            compilerOutput={compilerOutput}
            isAcceptedOutput={isAcceptedOutput}
          />
        </Allotment>
      </Allotment>
    </div>
  );
}

ProblemView.getLayout = function getLayout(page: ReactNode) {
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

// type MobilePanel = "problem" | "editor" | "output";

/* const [isMobile, setIsMobile] = useState<boolean>(false); */
/* const [mobileActivePanel, setMobileActivePanel] =
    useState<MobilePanel>("editor"); */
//const mobilePanels: Array<MobilePanel> = ["problem", "editor", "output"];
/* const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!windowWidth) return;
    if (windowWidth < 1168) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]); */
