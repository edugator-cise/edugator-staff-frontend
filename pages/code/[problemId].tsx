import React, {
  ComponentType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { adminPathRegex } from "constants/config";
import PlaygroundLayout from "components/PlaygroundLayout";
import {
  Grid,
  CircularProgress,
  Box,
  Alert,
  Grow,
  Typography,
} from "@mui/material";
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

const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

export default function CodeEditor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const locationState = router.asPath;

  const [stdin, setStdin] = useState<string>("");
  const [editorCode, setEditorCode] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!windowWidth) return;
    if (windowWidth < 1168) {
      setIsMobile(true);
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
    id: params && params.problemId ? (params.problemId as string) : "",
    isAdmin: LocalStorage.getToken() !== null,
  });

  useEffect(() => {
    if (defaultStdin) {
      setStdin(defaultStdin);
    }
    if (currentProblem) {
      setEditorCode(currentProblem?.code?.body);
    }
  }, [currentProblem]);

  const handleCodeChange = (newCode: string) => {
    setEditorCode(newCode);
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    // this gets called when mobile state changes.
    // So, we need to keep a duplicate of the code in the editor and replace it when the mobile state changes
    editorRef.current = editor;
    console.log("mmm", editorCode);
    editorRef.current.setValue(editorCode);
  };

  if (status === FetchStatus.loading) {
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
    <div className="w-full h-full bg-slate-100 dark:bg-nav-darkest">
      {isMobile ? (
        <div className="w-full h-full flex flex-col overflow-scroll">
          <div className="flex w-full h-full flex-col">
            <div className="w-full dark:border-b-slate-700 border-b-slate-300 pb-3 border-b pt-4 pl-5 pr-3 dark:bg-nav-darkest bg-slate-200">
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
          <InputOutputView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            submissionOutput={submissionOutput}
            stdin={stdin}
            setStdin={setStdin}
            compilerOutput={compilerOutput}
            isAcceptedOutput={isAcceptedOutput}
          />
        </div>
      ) : (
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
            <div className="w-full h-fit dark:bg-nav-darkest bg-slate-100 p-4 overflow-y-scroll">
              <ProblemView
                problemTitle={currentProblem?.title}
                problemStatement={currentProblem?.statement}
              />
            </div>
          </div>
          <Allotment sizes={[100, 100]} vertical snap={false} minSize={300}>
            <div className="w-full h-full">
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
            <div className="w-full h-full">
              <InputOutputView
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                submissionOutput={submissionOutput}
                stdin={stdin}
                setStdin={setStdin}
                compilerOutput={compilerOutput}
                isAcceptedOutput={isAcceptedOutput}
              />
            </div>
          </Allotment>
        </Allotment>
      )}
    </div>
  );
}

CodeEditor.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
