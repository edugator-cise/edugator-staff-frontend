/** Problem Interfaces */

import { ModalAnswer } from "components/ContentEditor/components/MultipleSelectModal";

export interface ITestCase {
  input: string;
  expectedOutput: string;
  hint: string;
  visibility: number;
}

export interface IProblem extends IProblemBase {
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

// lesson type fetched directly from db
export interface ILesson extends ILessonBase {
  _id?: string;
  title: string;
  author: string;
  content: Array<
    TextContent | ImageContent | MultipleChoiceContent | MultipleSelectContent
  >;
  editableContent: {
    blocks: {}[];
    entityMap: {}[];
  };
  blocks: {}[];
  entityMap: Array<ImageEntity | MultipleChoiceEntity | MultipleSelectEntity>;
}

/** Final display blocks for each content block type */
export type LessonBlock =
  | TextBlock
  | ImageBlock
  | MultipleChoiceBlock
  | MultipleSelectBlock;

export type TextBlock = {
  type: "text";
  data: {
    html: string;
  };
};

export type ImageBlock = {
  type: "image";
  data: {
    src: string;
  };
};

export type MultipleChoiceBlock = {
  type: "multiple_choice";
  data: {
    image?: boolean;
    src?: string;
    question: string;
    answers: string[];
    correct: number;
  };
};

export type MultipleSelectBlock = {
  type: "multiple_select";
  data: {
    question: string;
    answers: ModalAnswer[];
  };
};

export type LessonDisplay = {
  id: string;
  title: string;
  author: string;
  content: LessonBlock[];
};

/** Content block types in the lesson.content array */
export type TextContent = {
  type: "text";
  content: {
    html: string;
  };
};

export type ImageContent = {
  type: "image";
  content: {
    sourcePath: string;
    alignment: string;
  };
};

export type MultipleChoiceContent = {
  type: "multiple_choice";
  content: {
    image?: boolean;
    src?: string;
    question: string;
    answers: {
      id: number;
    }[];
    correct: number;
  };
};

export type MultipleSelectContent = {
  type: "multiple_select";
  content: {
    question: string;
    answers: ModalAnswer[];
  };
};

/** Content block types in the lesson.entityMap array */

export type ImageEntity = {
  type: "image";
  data: {
    src: string;
    alignment: string;
  };
};

export type MultipleChoiceEntity = {
  type: "multiple_choice";
  data: {
    image?: boolean;
    src?: string;
    question: string;
    answers: string[];
    correct: number;
  };
};

export type MultipleSelectEntity = {
  type: "multiple_select";
  data: {
    question: string;
    answers: ModalAnswer[];
  };
};

/** */

export interface INewProblem extends IProblem {
  moduleId: string;
}

export interface INewLesson extends ILesson {
  moduleId: string;
}

// please extend problem interfaces from here
export interface IProblemBase {
  _id?: string;
  title: string;
  // add more basic details as necessary
}

export interface ILessonBase {
  _id?: string;
  title: string;
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
  title?: string;
}

export interface IRequestMessage {
  message?: string;
}

/** Other Interfaces */
