import store from "../../../app/common/store";
import {
  setCurrentProblem,
  setNavStructure,
  requestModulesAndProblems,
  requestRunCode,
  submitCode,
  setStdin,
  setCompilerOutput,
  setActiveTab,
  setIsLoading,
  setRunningSubmission,
  setIsAcceptedOutput,
  setResultSubmission,
  setRunCodeError,
  resetinputOutputViewState,
} from "../CodeEditorSlice";
import { IProblem } from "../../../shared/types";
import {
  INavigationItem,
  IProblemItem,
  ICompilerOutput,
  IModuleWithProblemsAndLessons,
} from "../types";
import apiClient from "../../../app/common/apiClient";
const sampleProblems: IProblem[] = [
  {
    _id: "string",
    title: "string",
    hidden: true,
    language: "language",
    dueDate: new Date().toISOString(),
    statement: "string",
    code: {
      header: "string",
      body: "string",
      footer: "string",
    },
    fileExtension: ".cpp",
    testCases: [
      {
        input: "string",
        expectedOutput: "string",
        hint: "string",
        visibility: 2,
      },
    ],
    templatePackage: "string",
    timeLimit: 1,
    memoryLimit: 1,
    buildCommand: "string",
  },
];

const mockedModulesWithProblems: IModuleWithProblemsAndLessons = {
  _id: "samplemod id",
  name: "module 1",
  number: 5,
  lessons: [],
  problems: [
    {
      _id: "problem 1",
      title: "problem 2",
    },
  ],
};

describe("CodeEditor Reducer", () => {
  jest.mock("../../../app/common/apiClient", () => jest.fn());
  const apiClientMock = apiClient as jest.Mocked<typeof apiClient>;
  it("sets current problem", () => {
    const baseState = store.getState().codeEditor;
    store.dispatch(setCurrentProblem(sampleProblems[0]));

    const expected = {
      ...baseState,
      ...resetinputOutputViewState(),
      currentProblem: sampleProblems[0],
      codeBody: sampleProblems[0].code.body,
      runningSubmission: false,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });
  it("requests modules and problems", async () => {
    apiClientMock.get = jest.fn((url: string): Promise<any> => {
      if (url === "v1/module/WithNonHiddenProblems") {
        return Promise.resolve({ data: mockedModulesWithProblems });
      } else {
        return Promise.resolve({ data: sampleProblems[0] });
      }
    });
    const baseState = store.getState().codeEditor;

    store.dispatch(
      requestModulesAndProblems({
        isAdmin: true,
      })
    );
    const expected = {
      ...baseState,
      isLoading: true,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });
  it("sets loading state", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(setIsLoading(true));

    const expected = {
      ...baseState,
      isLoading: true,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets run code state", () => {
    const baseState = store.getState().codeEditor;
    const codePayload = {
      code: "sample",
      problemId: "sample",
      stdin: "sample",
      timeLimit: 5,
      memoryLimit: 5,
      buildCommand: "-Wall",
    };
    store.dispatch(requestRunCode(codePayload));

    const expected = {
      ...baseState,
      runningSubmission: true,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets submit code state", () => {
    const baseState = store.getState().codeEditor;
    const codePayload = {
      code: "sample",
      problemId: "sample",
      stdin: "sample",
      timeLimit: 5,
      memoryLimit: 5,
      buildCommand: "-Wall",
    };
    store.dispatch(submitCode(codePayload));

    const expected = {
      ...baseState,
      runningSubmission: true,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets loading state", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(setIsLoading(true));

    const expected = {
      ...baseState,
      isLoading: true,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets running submission", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(setRunningSubmission(true));
    const expected = {
      ...baseState,
      runningSubmission: true,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets stdin", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(setStdin("12345"));
    const expected = {
      ...baseState,
      stdin: "12345",
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets accepted output", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(setIsAcceptedOutput(true));

    const expected = {
      ...baseState,
      isAcceptedOutput: true,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets code error", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(setRunCodeError({ hasError: true, errorMessage: "sample" }));

    const expected = {
      ...baseState,
      runCodeError: {
        hasError: true,
        errorMessage: "sample",
      },
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });
  it("set result submission", () => {
    const baseState = store.getState().codeEditor;

    const resultSubmission = [
      {
        stdin: "sample",
        output: "sample",
        expectedOutput: "sample",
        result: true,
        hint: "sample",
      },
    ];
    store.dispatch(setResultSubmission(resultSubmission));

    const expected = {
      ...baseState,
      submissionOutput: resultSubmission,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets nav structure", () => {
    const baseState = store.getState().codeEditor;

    const problemItem: IProblemItem = {
      problemName: "hello",
      _id: "hello",
    };
    const navStructure: INavigationItem = {
      name: "module",
      _id: "id",
      number: 5.2,
      problems: [problemItem],
      lessons: [],
    };
    store.dispatch(setNavStructure([navStructure]));

    const expected = {
      ...baseState,
      navStructure: [navStructure],
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets compiler output", () => {
    const baseState = store.getState().codeEditor;

    const compOutput: ICompilerOutput = {
      compilerMessage: "hello",
      compilerBody: "hello",
    };

    store.dispatch(setCompilerOutput(compOutput));

    const expected = {
      ...baseState,
      compilerOutput: compOutput,
    };

    expect(store.getState().codeEditor).toEqual(expected);
  });

  it("sets active tab", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(setActiveTab(1));

    const expected = {
      ...baseState,
      activeTab: 1,
    };

    expect(store.getState().codeEditor).toEqual(expected);
  });
});
