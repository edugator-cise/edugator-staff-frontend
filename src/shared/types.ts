/** Problem Interfaces */

export interface ITestCase {
  input: string;
  expectedOutput: string;
  hint: string;
  visibility: number;
}

export interface IProblem {
  _id?: string;
  moduleId: string;
  title: string;
  hidden: boolean;
  language: string;
  dueDate: string; //iso format
  statement: string;
  code: {
    header: string;
    body: string;
    footer: string;
  };
  fileExtension: string;
  testCases: ITestCase[];
  templatePackage: string;
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
}

/** Module interfaces */

export interface IModuleBase {
  _id?: string;
  name: string;
  number: number;
}

/** Other Interfaces */
