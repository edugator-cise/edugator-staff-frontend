import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button, Grow, IconButton, Tooltip, Box } from "@mui/material";
import * as monaco from "monaco-editor";
import { styled } from "@mui/material/styles";
import { GetApp, Add, RotateLeft, CloudDownload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { requestRunCode, submitCode } from "../CodeEditorSlice";
import { RootState } from "../../../app/common/store";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../shared/constants";
// import { useTheme } from "@mui/material/styles";
import theme from "../../../shared/theme";
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
  justify-content: center;
  align-items: center;
`
);

const CodeHolder = styled("div")({
  margin: theme.spacing(1),
  maxHeight: 650,
  backgroundColor: "white",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
});

interface CodeEditorProps {
  code: string;
  templatePackage: string;
}

export const CodeEditorView = ({ code, templatePackage }: CodeEditorProps) => {
  const dispatch = useDispatch();
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up("lg"));
  // const md = useMediaQuery(theme.breakpoints.up("md"));
  // const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [currentCode, setCurrentCode] = useState(code);
  const isSubmissionRunning = useSelector(
    (state: RootState) => state.codeEditor.runningSubmission
  );
  const stdin = useSelector((state: RootState) => state.codeEditor.stdin);
  const problemId = useSelector(
    (state: RootState) => state.codeEditor.currentProblem?._id
  );
  const { timeLimit, memoryLimit, buildCommand } = useSelector(
    (state: RootState) => {
      return {
        timeLimit: state.codeEditor.currentProblem?.timeLimit,
        memoryLimit: state.codeEditor.currentProblem?.memoryLimit,
        buildCommand: state.codeEditor.currentProblem?.buildCommand,
      };
    }
  );
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
    }
  }, [code]);

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };
  const handleDownload = () => {
    const blob = new Blob([currentCode]);
    const blobURL = URL.createObjectURL(blob);
    const filename = "edugator-code.cpp";

    // Create a new link
    const anchor = document.createElement("a");
    anchor.href = blobURL;
    anchor.download = filename;
    // Append to the DOM
    document.body.appendChild(anchor);
    // Trigger `click` event
    anchor.click();
    // Remove element from DOM
    document.body.removeChild(anchor);
  };

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
    }
  };

  const parseFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const reader = new FileReader();
    if (event.target && event.target.files) {
      reader.readAsText(event.target.files[0]);
      reader.onload = async (event) => {
        const text = event.target?.result;
        if (editorRef.current) {
          editorRef.current.setValue(text as string);
        }
      };
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
    <Grow in appear timeout={500}>
      <CodeHolder>
        <ColumnContainer>
          <Box
            sx={{
              paddingLeft: 3,
              fontFamily: `'Inter', sans-serif`,
              fontWeight: 600,
            }}
          >
            Solution
          </Box>
          <Box sx={{ paddingRight: 3 }}>
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
              onChange={(e) => parseFile(e)}
            />
            <Tooltip title="Choose File" placement="top">
              <IconButton onClick={(e) => handleChooseFile(e)}>
                <Add />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download Submission" placement="top">
              <IconButton onClick={handleDownload}>
                <GetApp />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reset Code" placement="top">
              <IconButton onClick={handleReset}>
                <RotateLeft />
              </IconButton>
            </Tooltip>
          </Box>
        </ColumnContainer>
        <EditorContainer>
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
            height="40vh"
            defaultLanguage="cpp"
            defaultValue={code}
            onChange={(value) => {
              setCurrentCode(value as string);
            }}
            onMount={handleEditorMount}
          />
        </EditorContainer>
        <ColumnContainer style={{ justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="primary"
            disabled={isSubmissionRunning}
            sx={{ mr: 2 }}
            onClick={() =>
              dispatch(
                requestRunCode({
                  code: currentCode,
                  stdin,
                  problemId: problemId as string,
                  timeLimit: timeLimit as number,
                  memoryLimit: memoryLimit as number,
                  buildCommand: buildCommand as string,
                })
              )
            }
          >
            Run Code
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmissionRunning}
            sx={{ mr: 2 }}
            onClick={() =>
              dispatch(
                submitCode({
                  code: currentCode,
                  stdin,
                  problemId: problemId as string,
                  timeLimit: timeLimit as number,
                  memoryLimit: memoryLimit as number,
                  buildCommand: buildCommand as string,
                })
              )
            }
          >
            Submit
          </Button>
        </ColumnContainer>
      </CodeHolder>
    </Grow>
  );
};
