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
    }
  ];
  templatePackage: string;
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
  _id: string;
}

export interface IModule {
  name: string;
  number: number;
  problemList: IProblem[];
}
