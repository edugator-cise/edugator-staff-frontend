import {
  ICodeSubmission,
  IJudge0Response,
  IModuleWithProblemsAndLessons,
  INavigationItem,
} from "../../pages/CodeEditor/types";
import { CodeEditorContainer } from "./types";

export const editorInitialState: CodeEditorContainer = {
  isLoading: true,
  isLoadingLesson: true,
  currentProblem: undefined,
  currentLesson: undefined,
  navStructure: [],
  codeBody: "",
  runningSubmission: false,
  stdin: "",
  isAcceptedOutput: undefined,
  compilerOutput: {
    compilerMessage: "",
    compilerBody: "",
  },
  runCodeError: {
    hasError: false,
    errorMessage: "",
  },
  lessonLoadingError: {
    hasError: false,
    errorMessage: "",
  },
  submissionOutput: undefined,
  activeTab: 0, // stdin tab is active
  isLoadingProblem: false,
};

export const resetinputOutputViewState = () => ({
  stdin: "",
  isAcceptedOutput: undefined,
  compilerOutput: {
    compilerMessage: "",
    compilerBody: "",
  },
  submissionOutput: undefined,
});

export function getInitialCodeEditorState(): CodeEditorContainer {
  return { ...editorInitialState };
}

export const filterForProblem = (
  moduleProblemStructure: INavigationItem[],
  moduleName: string
): string | undefined => {
  let module: INavigationItem[] = moduleProblemStructure.filter(
    (moduleWithProblem: INavigationItem) =>
      moduleWithProblem.name === moduleName
  );
  if (module.length !== 0 && module[0].problems.length !== 0) {
    return module[0].problems[0]._id;
  }
  return undefined;
};

export const judge0Validator = ({
  data,
}: {
  data: IJudge0Response;
}): boolean => {
  return data.status.id >= 3;
};

export const poll = async (
  fn: Function,
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

/* function* submissionRace(
  action: PayloadAction<ICodeSubmission & { problemId: string }>
) {
  yield race({
    task: call(runCodeSubmission, action),
    cancel: take(requestProblem.type),
  });
} */
