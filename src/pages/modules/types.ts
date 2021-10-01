export interface IProblem {
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
  name: string;
  number: number;
  problemList: IProblem[];
}

/* Redux State - Modules */
export interface IModuleState {
  modules: IModule[];
  isLoading: boolean;
  errorMessage: string | null;
}

/* GET Request Actions - Modules */
export interface IModulesGET {}
export interface IModulesGETSuccess { 
  modules: IModule[];
}
export interface IModulesGETFailure { 
  message: string | null;
}

/* PUT Request Actions - Modules */
export interface IModulesPUT {
  moduleName: string;
  moduleNum: number;
}

export interface IModulesPUTSuccess {
  module: IModule;
}

export interface IModulesPUTFailure {
  message: string | null;
}

/* POST Request Actions - Modules */

/* DELETE Request Actions - Modules */

