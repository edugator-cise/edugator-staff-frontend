import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { generateFileName, handleDownload } from "utils/CodeEditorUtils";
import { useRouter } from "next/router";
import * as Tooltip from "@radix-ui/react-tooltip";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes";
import { Problem } from "hooks/problem/useGetProblem";
import {
  ArchiveIcon,
  DownloadIcon,
  FileIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import ActionButton from "components/shared/Buttons/ActionButton";

interface CodeEditorProps {
  problem: Problem;
  onMount: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  stdin: string;
  isSubmissionRunning: boolean;
  handleCodeReset: (code: string) => void;
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  parseFile: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
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
          className={`TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-slate-800 text-white font-dm text-xs font-medium rounded-md p-2 ${
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
  //code,
  //templatePackage,
  //currentProblem,
  problem,
  stdin,
  isSubmissionRunning,
  runCode,
  submitCode,
  onMount,
  handleCodeReset,
  parseFile,
}: CodeEditorProps) => {
  const router = useRouter();

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [currentCode, setCurrentCode] = useState<string>(problem?.codeBody);

  //ensure stdin is populated on every change
  const [inputToRun, setInputToRun] = useState(stdin);

  useEffect(() => {
    if (stdin) {
      console.log(stdin);
      setInputToRun(stdin);
    }
  }, [stdin]);

  const {
    timeLimit,
    memoryLimit,
    buildCommand,
    id: problemId,
    title,
    fileName,
  } = problem || {};

  const fileExtension = ".cpp";
  // recalling the use navigation hook because navStructure is passed through when downloading a problem
  const hiddenFileInput = useRef<HTMLInputElement>(null);

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
    handleCodeReset(problem.codeBody);
  };

  /* window.addEventListener("resize", () => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }); */

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
    <div className="w-full h-full flex flex-col justify-start p-3 pl-[6px] pb-[6px]">
      <div className="h-full w-full flex flex-col justify-start rounded-md overflow-hidden bg-white dark:bg-nav-dark border border-slate-300 dark:border-slate-700">
        <div className="rounded-t-md flex items-center justify-between w-full dark:border-b-slate-700 border-b-slate-300 border-b px-4 pr-1 py-1 dark:bg-nav-darkest bg-slate-100">
          <div className="flex space-x-4 items-center">
            <p className="text-xs text-slate-800 font-dm font-bold dark:text-white">
              Solution
            </p>
            <h3 className="text-[10px] text-slate-500 dark:text-white font-mono px-2 py-1 bg-slate-200/80 dark:bg-nav-dark rounded-md">
              {generateFileName(title, fileExtension)}
            </h3>
          </div>
          <div className="flex space-x-1 items-center">
            <a
              href={problem?.templatePackage}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
            >
              <ButtonToolTip label="Download Template">
                <button className="p-2 rounded-md relative hidden sm:flex transition after:h-full after:w-full after:absolute after:rounded-md after:scale-75 after:transition hover:after:scale-100 hover:after:bg-slate-300/50 dark:hover:after:bg-slate-300/20 z-10 after:-z-10 dark:hover:bg-nav-darkest items-center justify-center group">
                  <ArchiveIcon className="text-slate-800 dark:text-white" />
                </button>
              </ButtonToolTip>
            </a>
            <input
              className="fixed right-full bottom-full"
              ref={hiddenFileInput}
              type="file"
              onChange={(e) => {
                parseFile(e);
              }}
            />
            <ButtonToolTip label="Choose File">
              <button
                className="p-2 rounded-md relative hidden sm:flex transition after:h-full after:w-full after:absolute after:rounded-md after:scale-75 after:transition hover:after:scale-100 hover:after:bg-slate-300/50 dark:hover:after:bg-slate-300/20 z-10 after:-z-10 dark:hover:bg-nav-darkest items-center justify-center group"
                onClick={(e) => handleChooseFile(e)}
              >
                <FileIcon className="text-slate-800 dark:text-white" />
              </button>
            </ButtonToolTip>
            <ButtonToolTip label="Download Submission">
              <button
                onClick={(e) => {
                  if (title && fileExtension && fileName && currentCode) {
                    handleDownload(currentCode, title, fileExtension, fileName);
                  }
                }}
                className="p-2 rounded-md relative hidden sm:flex transition after:h-full after:w-full after:absolute after:rounded-md after:scale-75 after:transition hover:after:scale-100 hover:after:bg-slate-300/50 dark:hover:after:bg-slate-300/20 z-10 after:-z-10 dark:hover:bg-nav-darkest items-center justify-center group"
              >
                <DownloadIcon className="text-slate-800 dark:text-white" />
              </button>
            </ButtonToolTip>
            <ButtonToolTip label="Reset Code">
              <button
                onClick={() => handleReset()}
                className="p-2 rounded-md relative hidden sm:flex transition after:h-full after:w-full after:absolute after:rounded-md after:scale-75 after:transition hover:after:scale-100 hover:after:bg-slate-300/50 dark:hover:after:bg-slate-300/20 z-10 after:-z-10 dark:hover:bg-nav-darkest items-center justify-center group"
              >
                <ReloadIcon className="text-slate-800 dark:text-white" />
              </button>
            </ButtonToolTip>
          </div>
        </div>
        <div className="w-full h-full bg-white dark:bg-nav-dark flex flex-col">
          <Editor
            theme={currentTheme === "dark" ? "dark-theme" : "light"} //TODO: define custom theme with monaco.editor.defineTheme
            className="rounded-sm overflow-hidden"
            height="99%"
            beforeMount={setEditorTheme}
            defaultLanguage="cpp"
            defaultValue={problem?.codeBody}
            onChange={(value) => {
              setCurrentCode(value as string);
            }}
            options={{
              minimap: {
                enabled: false,
              },
            }}
            onMount={onMount}
          />
        </div>
        {/* Buttons */}
        <div className="w-full px-3 py-3 flex items-center justify-end bg-slate-100 rounded-b-md border-t border-t-slate-300 dark:border-t-slate-700 overflow-hidden dark:bg-nav-darkest">
          <div className="flex items-center space-x-2">
            <ActionButton
              color="gray"
              disabled={isSubmissionRunning}
              onClick={() => {
                console.log("run code");
                toast.promise(
                  runCode({
                    code: currentCode,
                    stdin: inputToRun,
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
            </ActionButton>
            <ActionButton
              color="green"
              disabled={isSubmissionRunning}
              onClick={() => {
                toast.promise(
                  submitCode({
                    code: currentCode,
                    stdin: inputToRun,
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
            </ActionButton>
          </div>
        </div>
      </div>

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
    </div>
  );
};
