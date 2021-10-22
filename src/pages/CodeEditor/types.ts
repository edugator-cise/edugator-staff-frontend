import { IModuleBase, IProblem } from "../../shared/types";

export interface IProblemItem {
  problemName: string;
  _id: string;
}

export interface INavigationItem {
  name: string;
  _id: string;
  problems: IProblemItem[];
}

export interface IToken {
  token: string;
}

export interface ICodeSubmission {
  code: string;
  header: string;
  footer: string;
  stdin: string;
}

export interface IJudge0Response {
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

type IModuleBaseWithID = IModuleBase & { _id: string };

type IProblemWithID = IProblem & { _id: string };

export interface IModuleWithProblems extends IModuleBaseWithID {
  problems: IProblemWithID[];
}

export interface IResultSubmission {
  stdin: string;
  output: string;
  expectedOutput: string;
  result: boolean;
}
