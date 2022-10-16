export class DeviceInterrogationSubmit {
	userId: string;
    requestId: string;
    device: string;
    company: string;
    date: string;
    answers: Answer[];

    constructor(userid: string, requestid: string, device:string,company:string,date:string, answer:Answer[]) {
        this.userId = userid;
		this.requestId = requestid;
        this.device = device;
        this.answers = answer;
        this.company=company;
        this.date=date;
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

