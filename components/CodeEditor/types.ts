import { IModuleBase } from "lib/shared/types";

export interface ModuleProblemRequest {
  isAdmin: boolean;
}

export interface ModuleLessonRequest {
  isAdmin: boolean;
}

export interface IProblemItem {
  problemName: string;
  _id: string;
}

export interface ILessonItem {
  lessonName: string;
  _id: string;
}

export interface INavigationItem {
  name: string;
  _id: string;
  number: number;
  problems: IProblemItem[];
  lessons: ILessonItem[];
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
type ILessonMetaWithID = { _id: string; title: string };

export interface IModuleWithProblemsAndLessons extends IModuleBaseWithID {
  problems: IProblemMetaWithID[];
  lessons: ILessonMetaWithID[];
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
