import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProblem } from "lib/shared/types";
import { TestCaseField } from "components/ProblemEditor/TestEditor/TestCase.utils";

export interface ProblemFields {
  problemStatement: string;
  templatePackage: string;
}

export interface MetadataLangConfig {
  language: string;
  selected: boolean;
}

export interface MetadataFields {
  title: string;
  hidden: boolean;
  languages: MetadataLangConfig[];
  dueDate: string;
}

export interface CodeEditorLangConfig {
  language: string,
  header: string;
  body: string;
  footer: string;
  fileExtension: string;
}

export interface CodeEditorFields {
  code: CodeEditorLangConfig[];
}

export interface ServerLangConfig {
  language: string,
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
}

export interface ServerConfigFields {
  config: ServerLangConfig[];
}

export enum WarningTypes {
  Delete = "DELETE",
  Quit = "QUIT",
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

  problemId: string | undefined;
  moduleId: string;
  moduleName: string | undefined;

  isSubmitting: boolean;
  fetchingProblem: boolean;
  showSuccessModal: boolean;
  showFailureModal: boolean;
  showWarningModal: boolean;
  warningType: WarningTypes | undefined;
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
    languages: [
      {
        language: "C++",
        selected: false
      },
      {
        language: "Python",
        selected: false
      },
      {
        language: "Java",
        selected: false
      }
      
    ],
    hidden: false,
    dueDate: new Date().toISOString(),
  },
  problem: {
    problemStatement: "",
    templatePackage: "",
  },
  codeEditor: {
    code: [
      {
        language: "C++",
        header: `//If students import packages or use namespaces on their own, it shouldn't cause problems
        #include <iostream>
        #include <vector>
        using namespace std;
        `,
        body: `int addTwoNums(int x, int y) {
          // Your code here
        }
        `,
        footer: `// The main does not have to be in the footer.
        // The main should remain in the footer if you don't want students to be able to see it nor change it.
        int main()
        {
            int x = 0, y = 0;
            cin >> x >> y;
            int result = addTwoNums(x, y);
            // You should print out whatever the expected output should be. 
            // Be careful about whitespace. Ex: only put endl if you add an endline in your expected output.
            cout << result;
            return 0;
        }
        `,
        fileExtension: ".h"
      },
      {
        language: "Python",
        header: `# If students import packages or use namespaces on their own, it shouldn't cause problems
        import sys
        import math
        import numpy as np
        import pandas as pd
        `,
        body: `def addTwoNums(x, y):
        # Your code here
        pass
        `,
        footer: `# The main does not have to be in the footer.
        # The main should remain in the footer if you don't want students to be able to see it nor change it.
        if __name__ == '__main__':
            x, y = map(int, input().split())
            result = addTwoNums(x, y)
            # You should print out whatever the expected output should be.
            # Be careful about whitespace. Ex: only put end='' if you don't want to end the line.
            print(result)
        `,
        fileExtension: ".py"
      },
      {
        language: "Java",
        header: `import java.util.Scanner;
        import java.util.ArrayList;
        import java.util.List;
        `,
        body: `public class Main {
          public static void main(String[] args) {
              Scanner input = new Scanner(System.in);
              int x = input.nextInt();
              int y = input.nextInt();
              int result = addTwoNums(x, y);
              System.out.println(result);
              input.close();
          }
        
          public static int addTwoNums(int x, int y) {
              // Your code here
          }
        }
        `,
        footer: ``,
        fileExtension: ".java"
      }
    ]
  },
  serverConfig: {
    config: [
      {
        language: "C++",
        timeLimit: 0,
        memoryLimit: 0,
        buildCommand: ""
      },
      {
        language: "Python",
        timeLimit: 0,
        memoryLimit: 0,
        buildCommand: ""
      },
      {
        language: "Java",
        timeLimit: 0,
        memoryLimit: 0,
        buildCommand: ""
      }
    ],
  },
  testCases: [],
  problemId: undefined,
  moduleId: "",
  moduleName: "",
  isSubmitting: false,
  fetchingProblem: false,
  showFailureModal: false,
  showSuccessModal: false,
  showWarningModal: false,
  warningType: undefined,
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

    updateProblemId: (state, action: PayloadAction<string | undefined>) => {
      state.problemId = action.payload;
    },
    updateModuleId: (state, action: PayloadAction<string>) => {
      state.moduleId = action.payload;
    },
    updateModuleName: (state, action: PayloadAction<string | undefined>) => {
      state.moduleName = action.payload;
    },

    closeFailureModal: (state) => {
      state.showFailureModal = false;
    },

    openWarningModal: (state, action: PayloadAction<WarningTypes>) => {
      state.showWarningModal = true;
      state.warningType = action.payload;
    },
    closeWarningModal: (state) => {
      state.showWarningModal = false;
      state.warningType = undefined;
    },

    resetState: (state) => {
      return getProblemEditorInitialState();
    },

    /* API calls */

    requestAddProblem: (state) => {
      state.isSubmitting = true;
    },
    requestAddProblemSuccess: (state) => {
      state.isSubmitting = false;
      state.showSuccessModal = true;
    },
    requestAddProblemFailure: (state) => {
      state.isSubmitting = false;
      state.showFailureModal = true;
    },

    requestGetProblem: (state, action: PayloadAction<string>) => {
      state.fetchingProblem = true;
    },
    requestGetProblemSuccess: (state, action: PayloadAction<IProblem>) => {
      state.fetchingProblem = false;

      state.metadataIsValid = true;
      state.problemIsValid = true;
      state.codeIsValid = true;
      state.serverConfigIsValid = true;
      state.testEditorIsValid = true;

      // Unpack lang config
      let metadata: MetadataLangConfig[] = []
      let code: CodeEditorLangConfig[] = []
      let server: ServerLangConfig[] = []

      action.payload.langConfig.forEach(item => {
        metadata.push({
          language: item.language,
          selected: item.selected
        });
        code.push({
          language: item.language,
          header: item.code.header,
          body: item.code.body,
          footer: item.code.footer,
          fileExtension: item.fileExtension
        });
        server.push({
          language: item.language,
          timeLimit: item.timeLimit,
          memoryLimit: item.memoryLimit,
          buildCommand: item.buildCommand
        });
      });
      
      state.metadata = {
        title: action.payload.title,
        hidden: action.payload.hidden,
        languages: metadata,
        dueDate: new Date(action.payload.dueDate).toISOString(),
      };
      state.codeEditor = {
        code: code
      };
      state.problem = {
        problemStatement: action.payload.statement,
        templatePackage: action.payload.templatePackage,
      };
      state.serverConfig = {
        config: server
      };
      state.testCases = action.payload.testCases.map((testCase) => ({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        hint: testCase.hint,
        visibility: testCase.visibility,
      }));
    },
    requestGetProblemFailure: (state, action: PayloadAction<any>) => {
      state.fetchingProblem = false;
      alert(action.payload);
    },

    requestUpdateProblem: (state) => {
      state.isSubmitting = true;
    },
    requestUpdateProblemSuccess: (state) => {
      state.isSubmitting = false;
      state.showSuccessModal = true;
      // TODO some kind of edit confirmation then back to modules
    },
    requestUpdateProblemFailure: (state, action: PayloadAction<any>) => {
      state.isSubmitting = false;
      state.showFailureModal = true;
    },

    requestDeleteProblem: (state) => {},
    requestDeleteProblemSuccess: (state) => {},
    requestDeleteProblemFailure: (state, action: PayloadAction<any>) => {
      alert(action.payload);
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
  closeFailureModal,
  requestAddProblem,
  requestAddProblemSuccess,
  requestAddProblemFailure,
  requestGetProblem,
  requestGetProblemSuccess,
  requestGetProblemFailure,
  requestUpdateProblem,
  requestUpdateProblemSuccess,
  requestUpdateProblemFailure,
  requestDeleteProblem,
  requestDeleteProblemSuccess,
  requestDeleteProblemFailure,
  updateModuleId,
  updateModuleName,
  updateProblemId,
  resetState,
  openWarningModal,
  closeWarningModal,
} = problemEditorContainerSlice.actions;
export default problemEditorContainerSlice.reducer;
