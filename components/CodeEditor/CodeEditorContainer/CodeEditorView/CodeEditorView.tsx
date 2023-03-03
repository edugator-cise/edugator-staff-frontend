import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import { useTheme } from "@mui/material/styles";
import { IProblem } from "lib/shared/types";
import {
  createNavStructure,
  generateFileName,
  handleDownload,
  parseFile,
} from "utils/CodeEditorUtils";
import { useRouter } from "next/router";
import useNavigation from "hooks/useNavigation";
import { LocalStorage } from "lib/auth/LocalStorage";
import { icons } from "./editorIcons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  code: string;
  onMount: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  templatePackage: string;
  currentProblem: IProblem;
  stdin: string;
  isSubmissionRunning: boolean;
  handleCodeChange: (code: string) => void;
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  runCode: ({
    code,
    stdin,
    problemId,
    timeLimit,
    memoryLimit,
    buildCommand,
  }: {
    code: string;
    stdin: string;
    problemId: string;
    timeLimit: number;
    memoryLimit: number;
    buildCommand: string;
  }) => Promise<void>;
  submitCode: ({
    code,
    stdin,
    problemId,
    timeLimit,
    memoryLimit,
    buildCommand,
  }: {
    code: string;
    stdin: string;
    problemId: string;
    timeLimit: number;
    memoryLimit: number;
    buildCommand: string;
  }) => Promise<void>;
}

const ButtonToolTip = ({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Tooltip.Provider delayDuration={100}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          sideOffset={5}
          align="center"
          className={`TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2 ${
            className ? className : ""
          }`}
        >
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export const CodeEditorView = ({
  code,
  templatePackage,
  currentProblem,
  stdin,
  isSubmissionRunning,
  runCode,
  submitCode,
  onMount,
  handleCodeChange,
}: CodeEditorProps) => {
  const router = useRouter();

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [currentCode, setCurrentCode] = useState(code);

  const {
    timeLimit,
    memoryLimit,
    buildCommand,
    _id: problemId,
    fileExtension: fileType,
  } = currentProblem;

  // recalling the use navigation hook because navStructure is passed through when downloading a problem
  const { problemAndLessonSet } = useNavigation(
    LocalStorage.getToken() !== null
  );
  const navigation = createNavStructure(problemAndLessonSet);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const fileName = generateFileName(navigation, problemId, fileType);

  function setEditorTheme(monaco: any) {
    monaco.editor.defineTheme("dark-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          token: "comment",
          foreground: "#5d7988",
          fontStyle: "italic",
        },
      ],
      colors: {
        "editor.background": "#192231",
      },
    });
  }

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
    }
  };

  window.addEventListener("resize", () => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  });

  const handleChooseFile = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="w-full h-full flex flex-col font-dm">
      <div className="w-full pt-2 pl-5 pr-3 flex justify-between items-center bg-slate-200 dark:bg-nav-darkest border-b dark:border-b-slate-700 border-b-slate-300">
        <div className="flex space-x-8 items-center">
          <p className="text-sm text-slate-800 font-dm font-bold dark:text-white">
            Solution
          </p>
          <div className="rounded-t-sm border-l border-r border-t -mb-2 border-slate-300 dark:border-slate-700 shadow-lg shadow-emerald-500/50 bg-slate-100 dark:bg-nav-darkest px-3 py-2">
            <h3 className="text-sm text-slate-800 dark:text-white font-dm">
              {fileName}
            </h3>
          </div>
        </div>
        <div className="flex space-x-2 py-1 items-center">
          <a
            href={templatePackage}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            <ButtonToolTip label="Download Template">
              <button className="w-8 h-8 p-2 rounded-md hidden sm:flex transition hover:bg-slate-300 dark:hover:bg-nav-darkest items-center justify-center group">
                {icons.downloadTemplate}
              </button>
            </ButtonToolTip>
          </a>
          <input
            style={{ display: "none" }}
            ref={hiddenFileInput}
            type="file"
            onChange={(e) => parseFile(e, editorRef)}
          />
          <ButtonToolTip label="Choose File">
            <button
              onClick={(e) => handleChooseFile(e)}
              className="w-8 h-8 p-2 rounded-md hidden sm:flex transition hover:bg-slate-300 dark:hover:bg-nav-darkest items-center justify-center group"
            >
              {icons.chooseFile}
            </button>
          </ButtonToolTip>
          <ButtonToolTip label="Download Submission">
            <button
              onClick={(e) =>
                handleDownload(currentCode, navigation, problemId, fileType)
              }
              className="w-8 h-8 p-2 rounded-md hidden sm:flex transition hover:bg-slate-300 dark:hover:bg-nav-darkest items-center justify-center group"
            >
              {icons.downloadSubmission}
            </button>
          </ButtonToolTip>
          <ButtonToolTip label="Reset Code">
            <button
              onClick={() => handleReset()}
              className="w-8 h-8 p-2 rounded-md transition hover:bg-slate-300 dark:hover:bg-nav-darkest flex items-center justify-center group"
            >
              {icons.resetCode}
            </button>
          </ButtonToolTip>
        </div>
      </div>
      <div className="w-full h-full flex flex-col p-4 bg-slate-100 dark:bg-nav-darkest">
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: "absolute",
          }}
          open={isSubmissionRunning}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Editor
          theme={currentTheme === "dark" ? "dark-theme" : "light"} //TODO: define custom theme with monaco.editor.defineTheme
          className="rounded-sm overflow-hidden"
          height="99%"
          beforeMount={setEditorTheme}
          defaultLanguage="cpp"
          defaultValue={code}
          onChange={(value) => {
            setCurrentCode(value as string);
            handleCodeChange(value as string);
          }}
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onMount={onMount}
        />
      </div>
      <div className="w-full px-3 pb-3 flex items-center justify-between bg-slate-100 dark:bg-nav-darkest">
        <button
          disabled={isSubmissionRunning}
          onClick={() => {
            console.log("run code");
            toast.promise(
              runCode({
                code: currentCode,
                stdin,
                problemId: problemId as string,
                timeLimit: timeLimit as number,
                memoryLimit: memoryLimit as number,
                buildCommand: buildCommand as string,
              }),
              {
                loading: "Running Code...",
                success: "Code Ran Successfully",
                error: "Error Running Code",
              },
              {
                position: "top-right",
                success: {
                  icon: "👨‍💻",
                },
              }
            );
          }}
          className="bg-transparent px-3 text-sm py-2 rounded-md border border-violet-400 flex items-center space-x-2"
        >
          <div className="w-4 h-4">
            <svg
              className="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 0C15.7101 0 16.2857 0.575633 16.2857 1.28571V3.85714C16.2857 4.56722 15.7101 5.14286 15 5.14286C14.2899 5.14286 13.7143 4.56722 13.7143 3.85714V1.28571C13.7143 0.575633 14.2899 0 15 0ZM21.9091 3.90914C22.4112 3.40704 22.4112 2.59296 21.9091 2.09086C21.407 1.58876 20.593 1.58876 20.0909 2.09086L18.3766 3.80515C17.8745 4.30725 17.8745 5.12133 18.3766 5.62342C18.8787 6.12552 19.6927 6.12552 20.1948 5.62342L21.9091 3.90914ZM16.6408 9.78362C17.3102 9.11414 17.3102 8.02872 16.6408 7.35924C15.9713 6.68978 14.8859 6.68978 14.2164 7.35924L0.502102 21.0735C-0.167367 21.743 -0.167367 22.8285 0.502102 23.4979C1.17157 24.1673 2.25699 24.1673 2.92647 23.4979L16.6408 9.78362ZM20.1429 7.71429C19.4328 7.71429 18.8571 8.28993 18.8571 9C18.8571 9.71007 19.4328 10.2857 20.1429 10.2857H22.7143C23.4243 10.2857 24 9.71007 24 9C24 8.28993 23.4243 7.71429 22.7143 7.71429H20.1429ZM17.5195 11.5194C18.0216 11.0173 18.8355 11.0173 19.3377 11.5194L21.0519 13.2337C21.5541 13.7358 21.5541 14.5499 21.0519 15.052C20.5498 15.5541 19.7359 15.5541 19.2338 15.052L17.5195 13.3377C17.0173 12.8356 17.0173 12.0215 17.5195 11.5194ZM10.7663 2.94801C10.2642 2.44591 9.4501 2.44591 8.94801 2.94801C8.44591 3.4501 8.44591 4.26418 8.94801 4.76628L10.6623 6.48057C11.1644 6.98266 11.9785 6.98266 12.4806 6.48057C12.9827 5.97847 12.9827 5.16439 12.4806 4.66229L10.7663 2.94801Z"
                className="fill-violet-600 dark:fill-violet-300"
              />
            </svg>
          </div>
          <p className="text-violet-600 dark:text-violet-300">Ask AI</p>
          <p className="dark:text-white text-violet-700 bg-violet-200 dark:bg-violet-600 px-2 rounded-full text-xs">
            beta
          </p>
        </button>
        <div className="flex items-center space-x-2">
          <button
            disabled={isSubmissionRunning}
            onClick={() => {
              console.log("run code");
              toast.promise(
                runCode({
                  code: currentCode,
                  stdin,
                  problemId: problemId as string,
                  timeLimit: timeLimit as number,
                  memoryLimit: memoryLimit as number,
                  buildCommand: buildCommand as string,
                }),
                {
                  loading: "Running Code...",
                  success: "Code Ran Successfully",
                  error: "Error Running Code",
                },
                {
                  position: "top-right",
                  success: {
                    icon: "👨‍💻",
                  },
                }
              );
            }}
            className="bg-transparent text-slate-600 dark:text-slate-300 px-3 text-sm py-2 rounded-md border border-slate-400"
          >
            Run Code
          </button>
          <button
            disabled={isSubmissionRunning}
            onClick={() => {
              toast.promise(
                submitCode({
                  code: currentCode,
                  stdin,
                  problemId: problemId as string,
                  timeLimit: timeLimit as number,
                  memoryLimit: memoryLimit as number,
                  buildCommand: buildCommand as string,
                }),
                {
                  loading: "Submitting Code...",
                  success: "Code Submitted Successfully",
                  error: "Error Submitting Code",
                },
                {
                  position: "top-right",
                  success: {
                    icon: "👨‍💻",
                  },
                }
              );
            }}
            className="bg-emerald-500 border-emerald-700 text-white px-3 text-sm py-2 rounded-md"
          >
            Submit Code
          </button>
        </div>
      </div>
    </div>
  );
};
