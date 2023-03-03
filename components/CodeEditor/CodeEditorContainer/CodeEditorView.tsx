import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button, Grow, IconButton, Tooltip, Box } from "@mui/material";
import * as monaco from "monaco-editor";
import { styled } from "@mui/material/styles";
import {
  GetApp,
  Add,
  RotateLeft,
  CloudDownload,
  BugReport,
} from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { adminPathRegex, colors } from "constants/config";
// import { useTheme } from "@mui/material/styles";
import theme from "constants/theme";
import { IProblem } from "lib/shared/types";
import {
  createNavStructure,
  handleDownload,
  parseFile,
} from "utils/CodeEditorUtils";
import { useRouter } from "next/router";
import useNavigation from "hooks/useNavigation";
import { LocalStorage } from "lib/auth/LocalStorage";
import JSZip from "jszip";
import { saveAs } from "file-saver";
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

const CodeHolder = styled("div")({
  margin: theme.spacing(1),
  height: "calc(100% - 15px)",
  backgroundColor: "white",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  overflow: "hidden",
});

interface CodeEditorProps {
  code: string;
  templatePackage: string;
  currentProblem: IProblem;
  stdin: string;
  isSubmissionRunning: boolean;
  templateZip: string;
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
  templateZip,
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

  const handleReportABug = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSf5MJP3NNd1MvIzulx4mE0zQ4K3l4TTyuT3JtUHVp_HFNifOw/viewform",
      "_blank",
      "noopener"
    );
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
            {/* <a
              href={templatePackage}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
            > */}
            <Tooltip title="Download Template" placement="top">
              <IconButton>
                <CloudDownload
                  onClick={(e) => {
                    // console.log(templateZip);
                    const zip = new JSZip();
                    //template zip is base64
                    zip.loadAsync(templateZip, { base64: true }).then((zip) => {
                      zip.generateAsync({ type: "blob" }).then((content) => {
                        saveAs(content, `${currentProblem.title}.zip`);
                      });
                    });
                  }}
                />
              </IconButton>
            </Tooltip>
            {/* </a> */}
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
            <Tooltip title="Report a bug" placement="top">
              <IconButton onClick={handleReportABug}>
                <BugReport />
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
            height="99%"
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
          >
            Run Code
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmissionRunning}
            sx={{ mr: 2 }}
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
          >
            Submit
          </Button>
        </ColumnContainer>
      </CodeHolder>
    </Grow>
  );
};
