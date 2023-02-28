import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button, Grow, IconButton, Tooltip, Box } from "@mui/material";
import * as monaco from "monaco-editor";
import { styled } from "@mui/material/styles";
import { GetApp, Add, RotateLeft, CloudDownload } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { adminPathRegex, colors } from "constants/config";
// import { useTheme } from "@mui/material/styles";
import theme from "constants/theme";
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
// import useMediaQuery from "@mui/material/useMediaQuery";

const ColumnContainer = styled("div")(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(1)};
  padding-bottom:${theme.spacing(1)};
  width: 100%;`
);

const EditorContainer = styled("div")(
  () => `
  border: solid 1px ${colors.borderGray};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
`
);

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
  }) => void;
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
  }) => void;
}

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
  /* const isSubmissionRunning = useSelector(
    (state: RootState) => state.codeEditor.runningSubmission
  ); */

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

  return (
    <div className="w-full h-full flex flex-col font-dm">
      <div className="w-full pt-2 pl-5 pr-3 flex justify-between items-center bg-slate-200 border-b border-b-slate-300">
        <div className="flex space-x-4 items-center ">
          <p className="text-sm text-slate-800 font-dm font-bold">Solution</p>
          <div className="rounded-t-sm border-l border-r border-t -mb-2 border-slate-300 shadow-2xl shadow-emerald-500 bg-slate-100 px-3 py-2">
            <h3 className="text-sm text-slate-800 font-dm">{fileName}</h3>
          </div>
        </div>
        <div className="">
          <a
            href={templatePackage}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            <Tooltip title="Download Template" placement="top">
              <IconButton>
                <CloudDownload />
              </IconButton>
            </Tooltip>
          </a>
          <input
            style={{ display: "none" }}
            ref={hiddenFileInput}
            type="file"
            onChange={(e) => parseFile(e, editorRef)}
          />
          <Tooltip title="Choose File" placement="top">
            <IconButton onClick={(e) => handleChooseFile(e)}>
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Submission" placement="top">
            <IconButton
              onClick={() => {
                handleDownload(currentCode, navigation, problemId, fileType);
              }}
            >
              <GetApp />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset Code" placement="top">
            <IconButton onClick={handleReset}>
              <RotateLeft />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Box sx={{ paddingRight: 3 }}></Box>
      <div className="w-full h-full flex flex-col py-2 px-3 bg-slate-100">
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
          className="rounded-md overflow-hidden border"
          height="99%"
          defaultLanguage="cpp"
          defaultValue={code}
          onChange={(value) => {
            setCurrentCode(value as string);
          }}
          onMount={handleEditorMount}
        />
      </div>
      <div className="w-full flex justify-end items-center px-3 pb-3 space-x-2 bg-slate-100">
        <button
          disabled={isSubmissionRunning}
          onClick={() =>
            submitCode({
              code: currentCode,
              stdin,
              problemId: problemId as string,
              timeLimit: timeLimit as number,
              memoryLimit: memoryLimit as number,
              buildCommand: buildCommand as string,
            })
          }
          className="bg-transparent text-slate-600 px-3 text-sm py-2 rounded-md border border-slate-400"
        >
          Run Code
        </button>
        <button
          disabled={isSubmissionRunning}
          onClick={() => {
            runCode({
              code: currentCode,
              stdin,
              problemId: problemId as string,
              timeLimit: timeLimit as number,
              memoryLimit: memoryLimit as number,
              buildCommand: buildCommand as string,
            });
          }}
          className="bg-emerald-500 border-emerald-700 text-white px-3 text-sm py-2 rounded-md"
        >
          Submit Code
        </button>
      </div>
    </div>
  );
};
