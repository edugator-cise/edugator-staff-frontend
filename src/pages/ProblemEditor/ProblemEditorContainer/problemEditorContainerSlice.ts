import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TestCaseField } from "../TestEditor/TestCase.utils";

export interface ProblemFields {
  problemStatement: string;
  templatePackage: string;
}

export interface MetadataFields {
  title: string;
  hidden: boolean;
  dueDate: Date;
}

export interface CodeEditorFields {
  code: {
    header: string;
    body: string;
    footer: string;
  };
  fileExtension: string;
}

export interface ServerConfigFields {
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
}

export interface ProblemEditorContainerState {
  /* 
    Each of these represents a stage of the problem editor Stepper component.
    The validity of each subform will be used to control/limit the navigation
    of the stepper. Each form can perform it's own validation then set these 
    fields accordingly 
  */
  metadataIsValid: boolean;
  problemIsValid: boolean;
  codeIsValid: boolean;
  serverConfigIsValid: boolean;
  testEditorIsValid: boolean;

  activeStep: number;

  metadata: MetadataFields;
  problem: ProblemFields;
  codeEditor: CodeEditorFields;
  serverConfig: ServerConfigFields;
  testCases: TestCaseField[];

  isSubmitting: boolean;
}

const initialState: ProblemEditorContainerState = {
  metadataIsValid: false,
  problemIsValid: false,
  codeIsValid: false,
  serverConfigIsValid: false,
  testEditorIsValid: false,
  activeStep: 0,
  metadata: {
    title: "",
    hidden: false,
    dueDate: new Date(),
  },
  problem: {
    problemStatement: "",
    templatePackage: "",
  },
  codeEditor: {
    code: {
      header: "",
      body: "",
      footer: "",
    },
    fileExtension: ".cpp",
  },
  serverConfig: {
    timeLimit: 0,
    memoryLimit: 0,
    buildCommand: "",
  },
  testCases: [],
  isSubmitting: false,
};

export const getProblemEditorInitialState = (): ProblemEditorContainerState => {
  return { ...initialState };
};

export const problemEditorContainerSlice = createSlice({
  name: "problemEditorContainer",
  initialState,
  reducers: {
    validateMetadata: (state, action: PayloadAction<boolean>) => {
      state.metadataIsValid = action.payload;
    },
    validateProblem: (state, action: PayloadAction<boolean>) => {
      state.problemIsValid = action.payload;
    },
    validateCode: (state, action: PayloadAction<boolean>) => {
      state.codeIsValid = action.payload;
    },
    validateServerConfig: (state, action: PayloadAction<boolean>) => {
      state.serverConfigIsValid = action.payload;
    },
    validateTestEditor: (state, action: PayloadAction<boolean>) => {
      state.testEditorIsValid = action.payload;
    },
    validateCurrentStep: (state, action: PayloadAction<boolean>) => {
      switch (state.activeStep) {
        case 0:
          state.metadataIsValid = action.payload;
          break;
        case 1:
          state.problemIsValid = action.payload;
          break;
        case 2:
          state.codeIsValid = action.payload;
          break;
        case 3:
          state.serverConfigIsValid = action.payload;
          break;
        case 4:
          state.testEditorIsValid = action.payload;
          break;
        default:
          break;
      }
    },

    incrementActiveStep: (state) => {
      if (state.activeStep < 4) {
        state.activeStep += 1;
      }
    },
    decrementActiveStep: (state) => {
      if (state.activeStep > 0) {
        state.activeStep -= 1;
      }
    },

    updateProblem: (state, action: PayloadAction<ProblemFields>) => {
      state.problem = action.payload;
    },
    updateMetadata: (state, action: PayloadAction<MetadataFields>) => {
      state.metadata = action.payload;
    },
    updateCodeEditor: (state, action: PayloadAction<CodeEditorFields>) => {
      state.codeEditor = action.payload;
    },
    updateServerConfig: (state, action: PayloadAction<ServerConfigFields>) => {
      state.serverConfig = action.payload;
    },
    updateTestCases: (state, action: PayloadAction<TestCaseField[]>) => {
      state.testCases = action.payload;
    },
    requestAddProblem: (state) => {
      state.isSubmitting = true;
    },
  },
});

export const {
  validateMetadata,
  validateProblem,
  validateCode,
  validateServerConfig,
  validateTestEditor,
  validateCurrentStep,
  incrementActiveStep,
  decrementActiveStep,
  updateProblem,
  updateMetadata,
  updateCodeEditor,
  updateServerConfig,
  updateTestCases,
  requestAddProblem,
} = problemEditorContainerSlice.actions;
export default problemEditorContainerSlice.reducer;
