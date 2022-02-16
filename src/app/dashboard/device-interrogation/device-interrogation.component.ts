import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DeviceInterrogation, Question } from 'src/app/model/device-interrogation.model';
import * as internal from 'stream';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Answer, DeviceInterrogationSubmit } from 'src/app/model/device-interrogation.submit.model';
import { DeviceInterrogationService } from 'src/app/services/device-interrogation.service';
import { first } from 'rxjs/operators';
import { IVideoConfig } from "ngx-video-list-player";
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
  userdetails: any;
  UserID: any;

  config: IVideoConfig = {
      isVideoLoader: true,
      isAutoPlay: false,
      isFirstVideoAutoPlay: false,
      subtitleOffText: "",
      subtitleText: "",
      videoListDisplayMode:"inline",
      volumeCookieName: "NgxVideoListPlayerVolume",
      videoIndexCookieName: "NgxVideoListPlayerIndex",
      sources: null      
  };

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
      this.buttonConfig();
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

    if (this.question.videos !== null && this.question.videos !== undefined)
    {
        this.config.sources  = this.question.videos
    } else{
      this.config.sources  = null
    }
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

