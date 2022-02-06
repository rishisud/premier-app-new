import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DeviceInterrogation, Question } from 'src/app/model/device-interrogation.model';
import * as internal from 'stream';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
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
  requestId: any;
  userdetails: any;
  UserID: any;
  constructor(private httpClient: HttpClient, private _router: ActivatedRoute, private deviceInterrogationService: DeviceInterrogationService, private router: Router) { }

  ngOnInit(): void {
    this._router.paramMap.subscribe(params=>{
          this.device=params.get('device');
          this.requestId=params.get('requestid')
		  this.userdetails = JSON.parse(localStorage.getItem('userdetails'));
		  this.UserID = this.userdetails.user_details[0].id;
    })

    this.httpClient.get<DeviceInterrogation>('assets/json/'+this.device+'.json').subscribe(data =>{
      this.deviceName=data.deviceName;
      this.questions = data.questions;
      this.question=this.questions[0];
    })
  }

  post():void{
    const postData = new DeviceInterrogationSubmit(this.UserID, this.requestId,this.device,this.answers);
    this.deviceInterrogationService.postData("username", postData)
      .pipe(first())
      .subscribe(
        data => {
          if(data.success) {
			console.log('Successfully Submitted');
			this.router.navigate(['/dashboard']);
          }
        },
        err => {
        });
	this.router.navigate(['/dashboard']);
      
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

