import React, { useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Button, Grow, IconButton, Tooltip, Box } from "@mui/material";
import * as monaco from "monaco-editor";
import { styled } from "@mui/material/styles";
import { GetApp, Add, RotateLeft, CloudDownload } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { adminPathRegex, colors, languages } from "constants/config";
// import { useTheme } from "@mui/material/styles";
import theme from "constants/theme";
import { IProblem, ILangConfig } from "lib/shared/types";
import { createNavStructure, handleDownload, parseFile } from "utils/CodeEditorUtils";
import { useRouter } from "next/router";
import useNavigation from "hooks/useNavigation";
import { LocalStorage } from "lib/auth/LocalStorage";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
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
  runCode: ({
    code,
    language,
    stdin,
    problemId,
    timeLimit,
    memoryLimit,
    buildCommand,
  }: {
    code: string;
    language: string;
    stdin: string;
    problemId: string;
    timeLimit: number;
    memoryLimit: number;
    buildCommand: string;
  }) => void;
  submitCode: ({
    code,
    language,
    stdin,
    problemId,
    timeLimit,
    memoryLimit,
    buildCommand,
  }: {
    code: string;
    stdin: string;
    language: string;
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
  const monacoRef = useMonaco();
  const [currentCode, setCurrentCode] = useState(code);
  /* const isSubmissionRunning = useSelector(
    (state: RootState) => state.codeEditor.runningSubmission
  ); */

  const {
    _id: problemId,
    statement,
    hidden,
    langConfig,
    dueDate,
    testCases
  } = currentProblem;

  const getLangConfig = (language: string): ILangConfig | undefined =>
    currentProblem.langConfig.find(config => config.language === language)

  const [currLangConfig, setCurrLangConfig] = useState(getLangConfig(languages.default))

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

  window.addEventListener("resize", () => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  });

  const languageOptions = currentProblem.langConfig.filter(config => config.selected).map(config => config.language)

  const onLanguageSelect = (option: any) => {
    var langConfig = getLangConfig(option.value)

    var body = langConfig!.code.body
    setCurrLangConfig(langConfig)
    

    if (editorRef.current) {
      var model = editorRef.current.getModel()

      if (monacoRef) {
        monacoRef.editor.onDidChangeModelLanguage(() => {
          editorRef.current?.setValue(body);    
        })
        
        if (option.value == languages.default) {
          monacoRef.editor.setModelLanguage(model!, "cpp")  
        } else {
          monacoRef.editor.setModelLanguage(model!, option.value.toLowerCase())
        }
      }
    }
  };


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
          <Box sx={{ paddingRight: 3, display: 'flex' }}>
            <Box sx={{ paddingRight: 1}}>
              <Dropdown options={languageOptions} onChange={onLanguageSelect} value={currLangConfig!.language} placeholder="Please select a language" />
            </Box>
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
                  handleDownload(currentCode, navigation, problemId, currLangConfig!.fileExtension);
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
                language: currLangConfig!.language,
                stdin,
                problemId: problemId as string,
                timeLimit: currLangConfig!.timeLimit as number,
                memoryLimit: currLangConfig!.memoryLimit as number,
                buildCommand: currLangConfig!.buildCommand as string,
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
                language: currLangConfig!.language,
                stdin,
                problemId: problemId as string,
                timeLimit: currLangConfig!.timeLimit as number,
                memoryLimit: currLangConfig!.memoryLimit as number,
                buildCommand: currLangConfig!.buildCommand as string,
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
