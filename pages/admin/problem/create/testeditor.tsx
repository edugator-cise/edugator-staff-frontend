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
import AdminLayout from "components/AdminLayout/AdminLayout";

const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

const AdminProblemEditor = () => {
  console.log("AdminProblemEditor");
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-nav-darkest relative">
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
                  &nbsp;&nbsp;&gt;&nbsp;&nbsp;{"Problem Title"}
                </span>
              </p>
            </div>
            <div className="w-full h-auto dark:bg-nav-darkest bg-slate-100 p-4 overflow-y-scroll">
              <div className="h-auto w-full">
                {/* <ProblemView
                  problemTitle={currentProblem?.title}
                  problemStatement={currentProblem?.statement}
                /> */}
                <div className="w-full h-full bg-red-500/10"></div>
              </div>
            </div>
          </div>
          <Allotment sizes={[100, 100]} vertical snap={false} minSize={300}>
            <div className="w-full h-full bg-blue-500/10">
              {/* <CodeEditorView
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
              /> */}
              <div className=""></div>
            </div>
            <div className="w-full h-full bg-amber-500/10">
              {/* <InputOutputView
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                submissionOutput={submissionOutput}
                stdin={stdin}
                setStdin={setStdin}
                compilerOutput={compilerOutput}
                isAcceptedOutput={isAcceptedOutput}
              /> */}
            </div>
          </Allotment>
        </Allotment>
      </div>
    </div>
  );
};

AdminProblemEditor.getLayout = (page: ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

export default AdminProblemEditor;
