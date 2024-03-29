import { Content } from "@tiptap/react";

type Visibility = "visible" | "hidden";

interface TestCase {
  input: string;
  expectedOutput: string;
  hint: string;
  visibility: number;
}

export interface LanguageData {
  header?: string;
  footer?: string;
  solution?: string;
  body: string;
  fileName?: string;
}

export type Language = "python" | "java" | "cpp";

export enum TestCaseVisibility {
  IO_HIDDEN = 0,
  I_VISIBLE_O_HIDDEN = 1,
  IO_VISIBLE = 2,
}

export type ProblemAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_HIDDEN"; payload: boolean }
  | { type: "SET_STATEMENT"; payload: Content }
  | { type: "ADD_LANGUAGE"; payload: Language }
  | { type: "REMOVE_LANGUAGE"; payload: Language }
  | {
      type: "SET_LANGUAGE_DATA";
      payload: { language: Language; data: LanguageData };
    }
  | { type: "SET_DUE_DATE"; payload: string }
  | { type: "SET_HEADER"; payload: string }
  | { type: "SET_BODY"; payload: string }
  | { type: "SET_FOOTER"; payload: string }
  | { type: "SET_TEMPLATE_PACKAGE"; payload: string }
  | { type: "SET_FILE_NAME"; payload: string }
  | { type: "SET_TIME_LIMIT"; payload: number }
  | { type: "SET_MEMORY_LIMIT"; payload: number }
  | { type: "SET_BUILD_COMMAND"; payload: string }
  | { type: "ADD_TEST_CASE"; payload: TestCase }
  | { type: "UPDATE_TEST_CASE"; payload: { index: number; testCase: TestCase } }
  | { type: "REMOVE_TEST_CASE"; payload: number };
