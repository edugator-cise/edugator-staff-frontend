import store from "../../../app/common/store";
import problemEditorContainerSlice, {
  ProblemEditorContainerState,
  validateMetadata,
  validateProblem,
  validateCode,
  validateServerConfig,
  validateTestEditor,
} from "./problemEditorContainerSlice";

describe("problemEditorContainer reducer", () => {
  const initialState: ProblemEditorContainerState = {
    metadataIsValid: false,
    problemIsValid: false,
    codeIsValid: false,
    serverConfigIsValid: false,
    testEditorIsValid: false,
  };

  it("initial states should default to false", () => {
    expect(problemEditorContainerSlice(undefined, { type: "unknown" })).toEqual(
      {
        metadataIsValid: false,
        problemIsValid: false,
        codeIsValid: false,
        serverConfigIsValid: false,
        testEditorIsValid: false,
      }
    );
  });

  it("should handle metadata validation", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      validateMetadata()
    );
    expect(actual.metadataIsValid).toBe(true);
  });

  it("should handle problem validation", () => {
    const actual = problemEditorContainerSlice(initialState, validateProblem());
    expect(actual.problemIsValid).toBe(true);
  });

  it("should handle code validation", () => {
    const actual = problemEditorContainerSlice(initialState, validateCode());
    expect(actual.codeIsValid).toBe(true);
  });

  it("should handle server config validation", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      validateServerConfig()
    );
    expect(actual.serverConfigIsValid).toBe(true);
  });

  it("should handle test editor validation", () => {
    const actual = problemEditorContainerSlice(
      initialState,
      validateTestEditor()
    );
    expect(actual.testEditorIsValid).toBe(true);
  });
});
