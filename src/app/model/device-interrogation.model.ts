export interface DeviceInterrogation {
    device: string;
    questions: Question[];
}

export interface Yes {
    step: number;
    msg: string;
}

export interface Back {
    step: number;
    msg: string;
}

export interface No {
    step: number;
    msg: string;
}

export interface Question {
    question: string;
    step: number;
    image:string;
    yes: Yes;
    no: No;
}

