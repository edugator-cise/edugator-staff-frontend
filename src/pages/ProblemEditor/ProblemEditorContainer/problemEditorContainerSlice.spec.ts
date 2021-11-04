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
} from "./problemEditorContainerSlice";
import apiClient from "../../../app/common/apiClient";
import store from "../../../app/common/store";

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
  it("should successfully fetch a problem", async () => {});

  it("should fail to get a problem", async () => {});
});
