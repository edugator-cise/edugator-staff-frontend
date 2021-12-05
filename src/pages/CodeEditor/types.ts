import { IModuleBase } from "../../shared/types";

export interface ModuleProblemRequest {
  isAdmin: boolean;
}
export interface IProblemItem {
  problemName: string;
  _id: string;
}

export interface INavigationItem {
  name: string;
  _id: string;
  number: number;
  problems: IProblemItem[];
}

export interface IToken {
  token: string;
}

export interface ICodeSubmission {
  code: string;
  stdin: string;
  problemId: string;
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
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

type IProblemMetaWithID = { _id: string; title: string };

export interface IModuleWithProblems extends IModuleBaseWithID {
  problems: IProblemMetaWithID[];
}

export interface IResultSubmission {
  stdin: string;
  output: string;
  expectedOutput: string;
  hint: string;
  result: boolean;
}

export interface ICompilerOutput {
  compilerMessage: string;
  compilerBody: string;
}

export interface ErrorObject {
  hasError: boolean;
  errorMessage: string;
}
