export interface DeviceInterrogationSubmit {
    device: string;
    questions: Answer[];
}

export class Answer {
    question: string;
    step: number;
    answer:string;
    comments:string

    constructor(question: string, step: number, answer:string, comments:string) {
        this.question = question;
        this.step = step;
        this.answer = answer;
        this.comments = comments;
      }
}

