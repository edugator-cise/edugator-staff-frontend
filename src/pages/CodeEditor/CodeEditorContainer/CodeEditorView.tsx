import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Paper, Button, Grow } from "@mui/material";
import * as monaco from "monaco-editor";
import { styled } from "@mui/material/styles";
import { GetApp, Add, RotateLeft, CloudDownload } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { requestRunCode, submitCode } from "../CodeEditorSlice";
import { RootState } from "../../../app/common/store";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../shared/constants";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const ColumnContainer = styled("div")(
  ({ theme }) => `
  display: flex;
  justify-content: flex-end;
  padding-top: ${theme.spacing(1)};
  padding-bottom:${theme.spacing(1)};
  
`
);

const EditorContainer = styled("div")(
  ({ theme }) => `
  position: relative;
  display: block;
  margin-left: ${theme.spacing(2)};
  margin-right: ${theme.spacing(2)};
  border: solid 1px ${colors.borderGray};
`
);

interface CodeEditorProps {
  code: string;
  templatePackage: string;
}

export const CodeEditorView = ({ code, templatePackage }: CodeEditorProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [currentCode, setCurrentCode] = useState(code);
  const header = useSelector(
    (state: RootState) => state.codeEditor.currentProblem?.code.header
  );
  const footer = useSelector(
    (state: RootState) => state.codeEditor.currentProblem?.code.footer
  );
  const isSubmissionRunning = useSelector(
    (state: RootState) => state.codeEditor.runningSubmission
  );
  const stdin = useSelector((state: RootState) => state.codeEditor.stdin);
  const problemId = useSelector(
    (state: RootState) => state.codeEditor.currentProblem?._id
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
    const blob = new Blob([header + currentCode + footer]);
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
  return (
    <Grow in appear timeout={500}>
      <Paper>
        <ColumnContainer>
          <a
            href={templatePackage}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              title="Download Template"
              variant="outlined"
              startIcon={<CloudDownload />}
              sx={{ marginRight: 1, marginTop: 1 }}
            >
              {matches && "Download Template"}
            </Button>
          </a>
          <input
            style={{ display: "none" }}
            ref={hiddenFileInput}
            type="file"
            onChange={(e) => parseFile(e)}
          />
          <Button
            title="Choose File"
            variant="outlined"
            startIcon={<Add />}
            onClick={(e) => handleChooseFile(e)}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            {matches && "Choose File"}
          </Button>
          <Button
            title="Download Submission"
            variant="outlined"
            startIcon={<GetApp />}
            onClick={handleDownload}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            {matches && "Download Submission"}
          </Button>
          <Button
            title="Reset Code"
            variant="outlined"
            startIcon={<RotateLeft />}
            onClick={handleReset}
            sx={{ marginRight: 1, marginTop: 1 }}
          >
            {matches && "Reset Code"}
          </Button>
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
        <ColumnContainer>
          <Button
            variant="outlined"
            color="primary"
            disabled={isSubmissionRunning}
            sx={{ mr: 2 }}
            onClick={() =>
              dispatch(
                requestRunCode({
                  code: currentCode,
                  header: header as string,
                  footer: footer as string,
                  stdin,
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
                  header: header as string,
                  footer: footer as string,
                  stdin,
                  problemId: problemId as string,
                })
              )
            }
          >
            Submit
          </Button>
        </ColumnContainer>
      </Paper>
    </Grow>
  );
};
