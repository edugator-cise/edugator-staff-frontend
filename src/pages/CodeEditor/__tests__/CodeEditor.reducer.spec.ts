import store from "../../../app/common/store";
import {
  setCurrentProblem,
  setCodeBody,
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
} from "../CodeEditorSlice";
import { resetinputOutputViewState } from "../CodeEditorSlice";
import { IProblem } from "../../../shared/types";
import { INavigationItem, IProblemItem, ICompilerOutput } from "../types";

const sampleProblems: IProblem[] = [
  {
    _id: "string",
    title: "string",
    hidden: true,
    language: "language",
    dueDate: new Date(),
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

describe("CodeEditor Reducer", () => {
  jest.mock("../../../app/common/apiClient");

  it("requests modules and problems", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(requestModulesAndProblems({
      moduleName: "extra",
      problemId: "extra"
    }));
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
      header: "sample",
      footer: "sample",
      stdin: "sample",
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
      header: "sample",
      footer: "sample",
      stdin: "sample",
      problemId: "sample",
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

  it("requests module and problems", () => {
    const baseState = store.getState().codeEditor;

    store.dispatch(setCodeBody("hello world"));
    const expected = {
      ...baseState,
      codeBody: "hello world",
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
      },
    ];
    store.dispatch(setResultSubmission(resultSubmission));

    const expected = {
      ...baseState,
      submissionOutput: resultSubmission,
    };
    expect(store.getState().codeEditor).toEqual(expected);
  });
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
