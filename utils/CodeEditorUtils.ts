import { INavigationItem } from "components/CodeEditor/types";
import * as monaco from "monaco-editor";

export const generateFileName = (
  navStructure: INavigationItem[],
  problemId: string | undefined,
  fileType: string
) => {
  let currentModuleNumber = -1;
  let currentProblemNumber = -1;
  let foundProblem = false;
  for (let i = 0; i < navStructure.length; i++) {
    for (let j = 0; j < navStructure[i].problems.length; j++) {
      if (navStructure[i].problems[j]._id === problemId) {
        foundProblem = true;
        currentModuleNumber = i;
        currentProblemNumber = j;
        break;
      }
    }
    if (foundProblem) {
      break;
    }
  }
  if (!foundProblem) {
    return "edugator-code.cpp";
  }
  return `cop3530_${currentModuleNumber + 1}_${
    currentProblemNumber + 1
  }${fileType}`;
};

export const handleDownload = (
  currentCode: string,
  navStructure: INavigationItem[],
  problemId: string | undefined,
  fileType: string
) => {
  const blob = new Blob([currentCode]);
  const blobURL = URL.createObjectURL(blob);
  const filename = generateFileName(navStructure, problemId, fileType);
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

export const parseFile = async (
  event: React.ChangeEvent<HTMLInputElement>,
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
) => {
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
