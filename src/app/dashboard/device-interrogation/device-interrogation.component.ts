import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DeviceInterrogation, Question } from 'src/app/model/device-interrogation.model';
import * as internal from 'stream';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Answer } from 'src/app/model/device-interrogation.submit.model';
@Component({
  selector: 'app-device-interrogation',
  templateUrl: './device-interrogation.component.html',
  styleUrls: ['./device-interrogation.component.css']
})
export class DeviceInterrogationComponent implements OnInit {
  device: any;
  deviceName:string | undefined;
  questions: Question[]=[];
  answers = new Array<Answer>();
  question: any;
  visibleSubmit = false;
  constructor(private httpClient: HttpClient, private _router: ActivatedRoute) { }

  ngOnInit(): void {
    this._router.paramMap.subscribe(params=>{
          this.device=params.get('device')
    })

    this.httpClient.get<DeviceInterrogation>('assets/json/'+this.device+'.json').subscribe(data =>{
      this.deviceName=data.deviceName;
      this.questions = data.questions;
      this.question=this.questions[0];
    })
  }

  post():void{

  }
  yesClicked():void{
    this.createAnswers( this.question, 'yes');
    this.visibleSubmit = this.visibleSubmitButton(this.question.yes.step);
    if (!this.visibleSubmit) {
      this.question =this.questions[this.question.yes.step-1];
    } else {
      this.question = this.questions[this.questions.length-1];
    }
  }

  noClicked():void{
    this.createAnswers( this.question, 'no')
    this.visibleSubmit = this.visibleSubmitButton(this.question.no.step);
    if (!this.visibleSubmit) {
      this.question =this.questions[this.question.no.step-1];
    } else {
      this.question = this.questions[this.questions.length-1];
    }
  }

  backClicked():void{
    this.question =this.questions.find(q=>q.step === this.answers[this.answers.length - 1].step);
    this.answers.pop();
    this.visibleSubmit = false;
  }

  visibleSubmitButton(value:number):boolean{
    return value === 0;
  }

  isNull(value:any):boolean{
    return value !== null && value !== undefined
  }

  private createAnswers(question:Question,selectedAnswer:string):void{
    this.answers.push(new Answer(question.question,question.step,selectedAnswer,''))
  }
}

