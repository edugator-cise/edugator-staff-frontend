import { ModalAnswer } from "./MultipleSelectModal";

interface content {}

class answerChoice {
  id: number;

  text: string;

  constructor(id: number, text: string) {
    this.id = id;
    this.text = text;
  }
}

class msAnswerChoice extends answerChoice {
  correct: boolean;

  constructor(id: number, text: string, correct: boolean) {
    super(id, text);
    this.correct = correct;
  }
}

export class text_content implements content {
  html: string;

  constructor(html: string) {
    this.html = html;
  }
}

export class image_content implements content {
  sourcePath: string;

  height: string;

  width: string;

  alignment: string;

  constructor(
    sourcePath: string,
    height: string,
    width: string,
    alignment: string
  ) {
    this.sourcePath = sourcePath;
    this.height = height;
    this.width = width;
    this.alignment = alignment;
  }
}

export class mc_content implements content {
  question: string;

  correctAnswer: number;

  answers: answerChoice[];

  constructor(question: string, correctAnswer: string, answers: string[]) {
    this.question = question;
    this.correctAnswer = parseInt(correctAnswer);
    this.answers = [];
    answers.forEach((answer, i) =>
      this.answers.push(new answerChoice(i, answer))
    );
  }
}

export class ms_content implements content {
  question: string;
  answers: msAnswerChoice[];
  constructor(question: string, answers: ModalAnswer[]) {
    this.question = question;
    this.answers = [];
    answers.forEach((answer, i) =>
      this.answers.push(new msAnswerChoice(i, answer.text, answer.correct))
    );
  }
}

export class contentBlock {
  type: string;

  content: content;

  constructor(type: string, content: content) {
    this.type = type;
    this.content = content;
  }
}
