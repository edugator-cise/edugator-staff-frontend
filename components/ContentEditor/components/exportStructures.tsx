import { ModalAnswer } from "./MultipleSelectModal";

interface content {}

class answerChoice {
  id: number;
  correct: boolean;
  text: string;

  constructor(id: number, text: string, correct: boolean) {
    this.id = id;
    this.text = text;
    this.correct = correct;
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
  answers: answerChoice[];

  constructor(
    question: string,
    answers: {
      text: string;
      correct: boolean;
    }[]
  ) {
    this.question = question;
    this.answers = [];
    console.log(answers);
    answers.forEach((answer, i) =>
      this.answers.push(new answerChoice(i, answer.text, answer.correct))
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
