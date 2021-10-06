
declare interface IProblemItem {
  problemName: string,
  _id: string
}

declare interface INavigationItem {
  name: string,
  _id: string,
  problems: IProblemItem[]
}


declare interface IModuleWithProblems {
  _id: string,
  name: string,
  number: number,
  problems: IProblem[]
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