/** Problem Interfaces */

export interface IProblem {
  _id?: string;
  title: string;
  hidden: boolean;
  language: string;
  dueDate: Date;
  statement: string;
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
    }
  ];
  templatePackage: string;
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
}

export interface IProblemBase {
  _id?: string;
  title: string;
  // add more basic details as necessary
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
}

/** Other Interfaces */
