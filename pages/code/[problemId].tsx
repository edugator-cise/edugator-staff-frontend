import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import PlaygroundLayout from "components/PlaygroundLayout/PlaygroundLayout";
import { CircularProgress } from "@mui/material";
import { ProblemView } from "components/CodeEditor/CodeEditorContainer/ProblemView";
import { CodeEditorView } from "components/CodeEditor/CodeEditorContainer/CodeEditorView/CodeEditorView";
import { InputOutputView } from "components/CodeEditor/CodeEditorContainer/InputOutputView/InputOutputView";
import "allotment/dist/style.css";
import { useFetchProblem } from "hooks/useFetchProblem";
import { FetchStatus } from "hooks/types";
import { useRunCode } from "hooks/useRunCode";
import dynamic from "next/dynamic";
import { LocalStorage } from "lib/auth/LocalStorage";
import { AllotmentProps } from "allotment";
import useWindowWidth from "hooks/useWindowSize";
import * as monaco from "monaco-editor";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import AnimateHeight from "react-animate-height";
import { toTitleCase } from "utils/textUtils";
import { IProblem } from "lib/shared/types";

const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

type MobilePanel = "problem" | "editor" | "output";

export default function CodeEditor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const locationState = router.asPath;

  const [stdin, setStdin] = useState<string>("");
  /* const [editorCode, setEditorCode] = useState<string>(""); */
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileActivePanel, setMobileActivePanel] =
    useState<MobilePanel>("editor");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const mobilePanels: Array<MobilePanel> = ["problem", "editor", "output"];

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!windowWidth) return;
    if (windowWidth < 1168) {
      setIsMobile(false); // TODO: Change to true after mobile fix
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]);

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

  const {
    status,
    problem: currentProblem,
    stdin: defaultStdin,
    error,
  } = useFetchProblem({
    id: params.problemId as string,
    isAdmin: LocalStorage.getToken() !== null,
  });

  /* useEffect(() => {
    if (defaultStdin) {
      setStdin(defaultStdin);
      setProblem(currentProblem);
    }
  }, [currentProblem, defaultStdin]); */

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

  console.log(currentProblem);

  if (status === FetchStatus.loading) {
    console.log("loading");
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-nav-darkest">
        <CircularProgress />
      </div>
    );
  } else if (currentProblem === undefined) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-nav-darkest">
        <h1 className="text-2xl font-dm text-slate-900 dark:text-white">
          Problem not found
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-100 dark:bg-nav-darkest relative">
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
      ) : (
        <div className="w-full h-full relative">
          {/* <AIChat /> */}
          <Allotment
            sizes={[310, 350]}
            snap={true}
            minSize={400}
            className="code-editor-allotment"
          >
            <div className="flex w-full h-full flex-col">
              <div className="w-full dark:border-b-slate-700 border-b-slate-300 pb-3 border-b pt-4 pl-5 pr-3 dark:bg-nav-darkest bg-slate-200">
                <p className="text-sm text-slate-800 font-dm font-bold dark:text-white">
                  Problems
                  <span className="text-slate-500 dark:text-slate-400 font-normal truncate">
                    &nbsp;&nbsp;&gt;&nbsp;&nbsp;{currentProblem?.title}
                  </span>
                </p>
              </div>
              <div className="w-full h-auto dark:bg-nav-darkest bg-slate-100 p-4 overflow-y-scroll">
                <div className="h-auto w-full">
                  <ProblemView
                    problemTitle={currentProblem?.title}
                    problemStatement={currentProblem?.statement}
                  />
                </div>
              </div>
            </div>
            <Allotment sizes={[100, 100]} vertical snap={false} minSize={300}>
              <div className="w-full h-full">
                <CodeEditorView
                  parseFile={parseFile}
                  handleCodeReset={handleCodeReset}
                  editorRef={editorRef}
                  onMount={handleEditorMount}
                  isSubmissionRunning={isSubmissionRunning}
                  runCode={runCode}
                  submitCode={submitCode}
                  code={currentProblem.code?.body}
                  templatePackage={currentProblem?.templatePackage}
                  currentProblem={currentProblem}
                  stdin={stdin}
                />
              </div>
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
            </Allotment>
          </Allotment>
        </div>
      )}
    </div>
  );
}

CodeEditor.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};

{
  /* <div className="w-full h-full flex flex-col overflow-scroll">
          <div className="flex w-full h-auto flex-col relative">
            <div className="w-full dark:border-b-slate-700 sticky top-0 border-b-slate-300 pb-3 border-b pt-4 pl-5 pr-3 dark:bg-nav-darkest bg-slate-200">
              <p className="text-sm text-slate-800 font-dm font-bold dark:text-white">
                Problems
                <span className="text-slate-500 dark:text-slate-400 font-normal truncate">
                  &nbsp;&nbsp;&gt;&nbsp;&nbsp;{currentProblem?.title}
                </span>
              </p>
            </div>
            <ProblemView
              problemTitle={currentProblem?.title}
              problemStatement={currentProblem?.statement}
            />
          </div>
          <div className="min-h-[30rem] w-full">
            <CodeEditorView
              handleCodeChange={handleCodeChange}
              editorRef={editorRef}
              onMount={handleEditorMount}
              isSubmissionRunning={isSubmissionRunning}
              runCode={runCode}
              submitCode={submitCode}
              code={currentProblem.code?.body}
              templatePackage={currentProblem?.templatePackage}
              currentProblem={currentProblem}
              stdin={stdin}
            />
          </div>
          <InputOutputView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            submissionOutput={submissionOutput}
            stdin={stdin}
            setStdin={setStdin}
            compilerOutput={compilerOutput}
            isAcceptedOutput={isAcceptedOutput}
          />
        </div> */
}
