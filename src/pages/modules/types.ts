export interface IProblem {
  _id?: string;
  problemType: string;
  title: string;
  hidden: boolean;
  language: string;
  dueDate: Date;
  code: {
    header: string;
    body: string;
    footer: string;
  };
  fileExtension: string;
  testCases: [
    {
      input: string;
      expectedOutput: string;
      hint: string;
      visibility: number;
      templatePackage: string;
    }
  ];
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
}

export interface IModule {
  _id?: string;
  name: string;
  number: number;
  problemList: IProblem[];
}

/** Creating a New Module dialog */
export interface INewModule {
  nameInput: string;
  numberInput: number;
}

export enum DialogStatus {
  EDIT = "edit",
  CREATE = "create",
  CLOSED = "closed",
}

/* Redux State - Modules */
export interface IModuleState {
  modules: IModule[];
  isLoading: boolean;
  errorMessage: string | null;
}

/* GET Request Actions - Modules */
export interface IModulesGETFailure {
  message: string | null;
}

/* PUT Request Actions - Modules */
export interface IModulesPUT {
  moduleName: string;
  moduleNum: number;
}

export interface IModulesPUTFailure {
  message: string | null;
}

/* POST Request Actions - Modules */

/* DELETE Request Actions - Modules */
