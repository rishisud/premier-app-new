export class DeviceInterrogationSubmit {
    requestId: string;
    device: string;
    answers: Answer[];

    constructor(requestid: string, device:string, answer:Answer[]) {
        this.requestId = requestid;
        this.device = device;
        this.answers = answer;
      }
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

