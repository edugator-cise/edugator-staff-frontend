import {
  ICodeSubmission,
  IJudge0Response,
  IModuleWithProblemsAndLessons,
  INavigationItem,
} from "components/CodeEditor/types";
import * as monaco from "monaco-editor";
import { Buffer } from "buffer";

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

export const judge0Validator = ({
  data,
}: {
  data: IJudge0Response;
}): boolean => {
  return data.status.id >= 3;
};

export const poll = async (
  fn: (value: any) => any,
  payload: any,
  validate: (value: any) => boolean,
  interval: number,
  maxAttempts: number
) => {
  let attempts = 0;

  const executePoll = async (resolve: any, reject: any) => {
    const result = await fn(payload);
    attempts++;
    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject(new Error("Exceeded max Attempts"));
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
};

export const filterForProblem = (
  moduleProblemStructure: INavigationItem[],
  moduleName: string
): string | undefined => {
  const module: INavigationItem[] = moduleProblemStructure.filter(
    (moduleWithProblem: INavigationItem) =>
      moduleWithProblem.name === moduleName
  );
  if (module.length !== 0 && module[0].problems.length !== 0) {
    return module[0].problems[0]._id;
  }
  return undefined;
};

export const createNavStructure = (
  moduleProblemStructure: IModuleWithProblemsAndLessons[]
) => {
  const moduleItems: INavigationItem[] = [];
  moduleProblemStructure.forEach((element) => {
    const payload = {
      _id: element._id as string,
      name: element.name,
      number: element.number,
      problems: element.problems.map((el) => ({
        problemName: el.title,
        _id: el._id,
      })),
      lessons: element.lessons?.map((el) => ({
        lessonName: el.title,
        _id: el._id,
      })),
    };
    moduleItems.push(payload);
  });
  return moduleItems;
};

export const transformPayload = (payload: ICodeSubmission) => {
  const base64EncodedCode = Buffer.from(payload.code || "", "utf-8").toString(
    "base64"
  );
  const base64EncodedStdin = Buffer.from(payload.stdin || "", "utf-8").toString(
    "base64"
  );
  const body = {
    source_code: base64EncodedCode,
    language_id: 54, //C++
    base_64: true,
    stdin: base64EncodedStdin,
    problemId: payload.problemId,
    cpu_time_limit: payload.timeLimit === 0 ? undefined : payload.timeLimit,
    memory_limit: payload.memoryLimit === 0 ? undefined : payload.memoryLimit,
    compiler_options:
      payload.buildCommand === "" ? undefined : payload.buildCommand,
  };
  return body;
};

export const evaluateCompilerBody = (resultData: IJudge0Response) => {
  if (resultData.status.id === 3 && resultData.stdout) {
    return Buffer.from(resultData.stdout || "", "base64").toString();
  } else if (resultData.status.id === 6) {
    return Buffer.from(resultData.compile_output || "", "base64").toString();
  } else if (resultData.status.id === 5) {
    return Buffer.from(resultData.message || "", "base64").toString();
  } else if (resultData.status.id >= 7 && resultData.status.id <= 12) {
    let message = Buffer.from(resultData.stderr || "", "base64").toString();
    message += "\n";
    message += Buffer.from(resultData.message || "", "base64").toString();
    return message;
  } else {
    return "";
  }
};

export function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}

export const deepClone = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};
