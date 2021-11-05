import problemEditorContainerSlice, {
  ProblemEditorContainerState,
  validateMetadata,
  validateProblem,
  validateCode,
  validateServerConfig,
  validateTestEditor,
  validateCurrentStep,
  incrementActiveStep,
  decrementActiveStep,
  getProblemEditorInitialState,
  requestAddProblem,
  resetState,
  requestGetProblem,
  requestUpdateProblem,
} from "./problemEditorContainerSlice";
import apiClient from "../../../app/common/apiClient";
import store from "../../../app/common/store";
import { IProblem } from "../../../shared/types";

const dispatch = store.dispatch;

beforeEach(() => {
  dispatch(resetState());
});

describe("problemEditorContainer reducer", () => {
  const initialState: ProblemEditorContainerState =
    getProblemEditorInitialState();

  it("should handle metadata validation", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      validateMetadata(true)
    );
    expect(actual.metadataIsValid).toBe(true);
  });

  it("should handle problem validation", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      validateProblem(true)
    );
    expect(actual.problemIsValid).toBe(true);
  });

  it("should handle code validation", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      validateCode(true)
    );
    expect(actual.codeIsValid).toBe(true);
  });

  it("should handle server config validation", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      validateServerConfig(true)
    );
    expect(actual.serverConfigIsValid).toBe(true);
  });

  it("should handle test editor validation", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      validateTestEditor(true)
    );
    expect(actual.testEditorIsValid).toBe(true);
  });

  it("should validate current step - metadata", () => {
    const actual = problemEditorContainerSlice(
      {
        ...initialState,
        activeStep: 0,
      },
      validateCurrentStep(true)
    );
    expect(actual.metadataIsValid).toBe(true);
  });

  it("should validate current step - problem", () => {
    const actual = problemEditorContainerSlice(
      {
        ...initialState,
        activeStep: 1,
      },
      validateCurrentStep(true)
    );
    expect(actual.problemIsValid).toBe(true);
  });

  it("should validate current step - code", () => {
    const actual = problemEditorContainerSlice(
      {
        ...initialState,
        activeStep: 2,
      },
      validateCurrentStep(true)
    );
    expect(actual.codeIsValid).toBe(true);
  });

  it("should validate current step - server config", () => {
    const actual = problemEditorContainerSlice(
      {
        ...initialState,
        activeStep: 3,
      },
      validateCurrentStep(true)
    );
    expect(actual.serverConfigIsValid).toBe(true);
  });

  it("should validate current step - test editor", () => {
    const actual = problemEditorContainerSlice(
      {
        ...initialState,
        activeStep: 4,
      },
      validateCurrentStep(true)
    );
    expect(actual.testEditorIsValid).toBe(true);
  });

  it("increment adds 1 to activeStep", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      incrementActiveStep()
    );
    expect(actual.activeStep).toBe(1);
  });

  it("increment will not increase activeStep past 4", () => {
    const actual = problemEditorContainerSlice(
      {
        ...initialState,
        activeStep: 4,
      },
      incrementActiveStep()
    );
    expect(actual.activeStep).toBe(4);
  });

  it("decrement subtracts 1 from activeStep", () => {
    const actual = problemEditorContainerSlice(
      {
        ...initialState,
        activeStep: 4,
      },
      decrementActiveStep()
    );
    expect(actual.activeStep).toBe(3);
  });

  it("decrement will not decreaase activeStep past 0", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      decrementActiveStep()
    );
    expect(actual.activeStep).toBe(0);
  });
});

jest.mock("../../../app/common/apiClient");
const mockApi = apiClient as jest.Mocked<typeof apiClient>;

const mockProblemId = "123456789012345678901234";

const mockProblem: IProblem = {
  title: "Mock problem",
  statement: "This is a problem",
  templatePackage: "https://code.com",
  timeLimit: 10,
  memoryLimit: 5,
  hidden: false,
  dueDate: "2021-11-04",
  language: "C++",
  fileExtension: ".cpp",
  code: {
    header: "headerFunction()",
    body: "bodyFunction()",
    footer: "footerFunction()",
  },
  buildCommand: "-flag",
  testCases: [
    {
      expectedOutput: "output",
      input: "input",
      visibility: 1,
      hint: "some hint",
    },
  ],
};

const expectedState: ProblemEditorContainerState = {
  ...getProblemEditorInitialState(),
  problem: {
    problemStatement: mockProblem.statement,
    templatePackage: mockProblem.templatePackage,
  },
  metadata: {
    title: mockProblem.title,
    dueDate: new Date(mockProblem.dueDate),
    hidden: mockProblem.hidden,
  },
  codeEditor: {
    code: { ...mockProblem.code },
    fileExtension: mockProblem.fileExtension,
  },
  serverConfig: {
    memoryLimit: mockProblem.memoryLimit,
    timeLimit: mockProblem.timeLimit,
    buildCommand: mockProblem.buildCommand,
  },
  testCases: mockProblem.testCases,
  problemIsValid: true,
  codeIsValid: true,
  serverConfigIsValid: true,
  metadataIsValid: true,
  testEditorIsValid: true,
};

describe("Adding a new problem", () => {
  it("should successfully add a problem", async () => {
    mockApi.post.mockResolvedValueOnce({});

    await dispatch(requestAddProblem());
    expect(store.getState().problemEditorContainer.showSuccessModal).toEqual(
      true
    );
    expect(store.getState().problemEditorContainer.showFailureModal).toEqual(
      false
    );
  });

  it("should fail to add a new problem", async () => {
    mockApi.post.mockRejectedValueOnce({});

    await dispatch(requestAddProblem());
    expect(store.getState().problemEditorContainer.showSuccessModal).toEqual(
      false
    );
    expect(store.getState().problemEditorContainer.showFailureModal).toEqual(
      true
    );
  });
});

describe("Getting a problem", () => {
  it("should successfully fetch a problem", async () => {
    mockApi.get.mockResolvedValueOnce({ data: { ...mockProblem } });

    await dispatch(requestGetProblem(mockProblemId));
    expect(store.getState().problemEditorContainer).toEqual(expectedState);
  });

  it("should fail to fetch a problem", async () => {
    mockApi.get.mockRejectedValueOnce({});
    window.alert = jest.fn();
    await dispatch(requestGetProblem(mockProblemId));
    expect(store.getState().problemEditorContainer).toEqual(
      getProblemEditorInitialState()
    );
  });
});

describe("Updating a problem", () => {
  it("should successfully update a problem", async () => {
    mockApi.put.mockResolvedValueOnce({});

    await dispatch(requestUpdateProblem());
    expect(store.getState().problemEditorContainer.showSuccessModal).toBe(true);
    expect(store.getState().problemEditorContainer.showFailureModal).toBe(
      false
    );
  });
  it("should failt to update a problem", async () => {
    mockApi.put.mockRejectedValueOnce({});

    await dispatch(requestUpdateProblem());
    expect(store.getState().problemEditorContainer.showSuccessModal).toBe(
      false
    );
    expect(store.getState().problemEditorContainer.showFailureModal).toBe(true);
  });
});
