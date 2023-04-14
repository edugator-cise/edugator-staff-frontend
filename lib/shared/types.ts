/** Problem Interfaces */

export interface ITestCase {
  input: string;
  expectedOutput: string;
  hint: string;
  visibility: number;
}

export interface ILangConfig {
  language: string;
  selected: boolean;
  code: {
    header: string;
    body: string;
    footer: string;
  };
  fileExtension: string;
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
}

export interface IProblem extends IProblemBase {
  statement: string;
  hidden: boolean;
  langConfig: ILangConfig[];
  dueDate: string; //iso format
  testCases: ITestCase[];
  templatePackage: string;
}

export interface ILesson extends ILessonBase {
  title: string;
  author: string;
  content: {}[];
  editableContent: {
    blocks: {}[];
    entityMap: {}[];
  };
  blocks: {}[];
  entityMap: {}[];
}

export interface INewProblem extends IProblem {
  moduleId: string;
}

export interface INewLesson extends ILesson {
  moduleId: string;
}

// please extend problem interfaces from here
export interface IProblemBase {
  _id?: string;
  title: string;
  // add more basic details as necessary
}

export interface ILessonBase {
  _id?: string;
  title: string;
}

/** Module interfaces */

export interface IModuleBase {
  _id?: string;
  name: string;
  number: number;
}

/** Feedback Interfaces */

/** Useful Enum */
export enum AlertType {
  info = "info",
  error = "error",
  success = "success",
}

export interface IFeedback {
  message?: string;
  display: boolean;
  type: AlertType;
  title?: string;
}

export interface IRequestMessage {
  message?: string;
}

/** Other Interfaces */
