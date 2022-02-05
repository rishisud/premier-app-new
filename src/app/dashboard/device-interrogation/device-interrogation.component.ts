import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DeviceInterrogation, Question } from 'src/app/model/device-interrogation.model';
import * as internal from 'stream';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Answer, DeviceInterrogationSubmit } from 'src/app/model/device-interrogation.submit.model';
import { DeviceInterrogationService } from 'src/app/services/device-interrogation.service';
import { first } from 'rxjs/operators';
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
  yes =false;
  no=false;
  back=false;
  submit =false;
  next =false;
  requestId: any;
  constructor(private httpClient: HttpClient, private _router: ActivatedRoute, private deviceInterrogationService: DeviceInterrogationService) { }

  ngOnInit(): void {
    this._router.paramMap.subscribe(params=>{
          this.device=params.get('device');
          this.requestId=params.get('requestid')
    })

    this.httpClient.get<DeviceInterrogation>('assets/json/'+this.device+'.json').subscribe(data =>{
      this.deviceName=data.deviceName;
      this.questions = data.questions;
      this.question=this.questions[0];
      this.buttonConfig();
    })
  }

  post():void{
    const postData = new DeviceInterrogationSubmit(this.requestId,this.device,this.answers);
    this.deviceInterrogationService.postData("username", postData)
      .pipe(first())
      .subscribe(
        data => {
          if(data.success) {
          }
        },
        err => {
        });
      
  }
  yesClicked():void{
    this.createAnswers( this.question, 'yes');
    this.question =this.questions[this.question.yes.step-1];
    this.buttonConfig();
  }

  noClicked():void{
    this.createAnswers( this.question, 'no')
    this.question =this.questions[this.question.no.step-1];
    this.buttonConfig();
  }

  nextClicked():void{
    this.createAnswers( this.question, '');
    this.question =this.questions[this.question.next.step-1];
    this.buttonConfig();
  }

  buttonConfig():void{
    this.next = this.question.next !== undefined && this.question.next !== null;
    this.yes = this.question.yes !== undefined &&this.question.yes !== null;
    this.no = this.question.no !== undefined && this.question.no !== null;
    this.submit =this.question.submit;
  }

  backClicked():void{
    this.question =this.questions.find(q=>q.step === this.answers[this.answers.length - 1].step);
    this.answers.pop();
    this.buttonConfig()
  }


  isNull(value:any):boolean{
    return value !== null && value !== undefined
  }

  private createAnswers(question:Question,selectedAnswer:string):void{
    this.answers.push(new Answer(question.question,question.step,selectedAnswer,''))
  }
}

