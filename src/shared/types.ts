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

/** Module interfaces */

export interface IModuleBase {
  _id?: string;
  name: string;
  number: number;
}

/** Other Interfaces */
