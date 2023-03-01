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
  templatePackage: string;
  currentProblem: IProblem;
  stdin: string;
  isSubmissionRunning: boolean;
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
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Tooltip.Provider delayDuration={100}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="bottom"
          sideOffset={5}
          align="center"
          className="TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2"
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
}: CodeEditorProps) => {
  const router = useRouter();
  const locationState = router.asPath;
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

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
    }
  }, [code]);

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

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
    }
  };

  const handleChooseFile = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  window.addEventListener("resize", () => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  });

  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="w-full h-full flex flex-col font-dm">
      <div className="w-full pt-2 pl-5 pr-3 flex justify-between items-center bg-slate-200 dark:bg-nav-darkest border-b dark:border-b-slate-700 border-b-slate-300">
        <div className="flex space-x-8 items-center ">
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
              <button className="w-8 h-8 p-2 rounded-md transition hover:bg-slate-300 dark:hover:bg-nav-darkest flex items-center justify-center group">
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
              className="w-8 h-8 p-2 rounded-md transition hover:bg-slate-300 dark:hover:bg-nav-darkest flex items-center justify-center group"
            >
              {icons.chooseFile}
            </button>
          </ButtonToolTip>
          <ButtonToolTip label="Download Submission">
            <button
              onClick={(e) =>
                handleDownload(currentCode, navigation, problemId, fileType)
              }
              className="w-8 h-8 p-2 rounded-md transition hover:bg-slate-300 dark:hover:bg-nav-darkest flex items-center justify-center group"
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
          }}
          options={{
            minimap: {
              enabled: false,
            },
          }}
          onMount={handleEditorMount}
        />
      </div>
      <div className="w-full flex justify-end items-center px-3 pb-3 space-x-2 bg-slate-100 dark:bg-nav-darkest">
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
  );
};