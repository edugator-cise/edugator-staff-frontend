declare interface IProblemItem {
  problemName: string;
  _id: string;
}

declare interface IResultSubmission {
  stdin: string;
  output: string;
  expectedOutput: string;
  result: boolean;
}
declare interface IToken {
  token: string;
}
declare interface INavigationItem {
  name: string;
  _id: string;
  problems: IProblemItem[];
}

declare interface ICodeSubmission {
  code: string;
  header: string;
  footer: string;
  stdin: string;
}

declare interface IJudge0Response {
  stdout: string | null;
  stderr: string | null;
  compile_output: string;
  memory: number | null;
  token: string;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
}

declare interface IModuleWithProblems {
  _id: string;
  name: string;
  number: number;
  problems: IProblem[];
}

declare interface IProblem {
  statement: string;
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
    }
  ];
  templatePackage: string;
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
  _id: string;
}

declare interface IModule {
  name: string;
  number: number;
  problemList: IProblem[];
}
