interface content { }

class answerChoice {
    id: number;
    text: string;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}

export class text_content implements content {
    html: string;

    constructor(html: string) {
        this.html = html
    }
}

export class image_content implements content {
    sourcePath: string;
    height: string;
    width: string;
    alignment: string;

    constructor(sourcePath: string, height: string, width: string, alignment: string) {
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
        answers.forEach((answer, i) => this.answers.push(new answerChoice(i, answer)))
    }
}

export class ms_content implements content {
    question: string;
    correctAnswer: number[];
    answers: answerChoice[];

    constructor(question: string, correctAnswer: number[], answers: string[]) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.answers = [];
        answers.forEach((answer, i) => this.answers.push(new answerChoice(i, answer)))
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

