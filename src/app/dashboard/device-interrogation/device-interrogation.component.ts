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
  yes =false;
  no=false;
  back=false;
  submit =false;
  next =false;
  requestId: any;
  company: any;
  date: any;
  userdetails: any;
  UserID: any;

  videoItems:any=null;
  activeIndex = 0;
  currentVideo:any;
  data: any;
  audio:any;
  play=false;

  playSound(step:any) {
    this.audio = new Audio();
    this.audio.src = 'assets/audio/'+this.device+'/'+step+'.mp3';
    this.audio.load();
    this.audio.play();
    this.play=true;
  }

  stopAudio() {
    if(this.play){
      this.play=false;
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videoItems[this.activeIndex];
  }
  initVdo() {
    this.data.play();
  }
  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }

  constructor(private httpClient: HttpClient, private _router: ActivatedRoute, private deviceInterrogationService: DeviceInterrogationService, private router: Router) { }


  ngOnInit(): void {
     this._router.paramMap.subscribe(params=>{
          this.device=params.get('device');
          this.requestId=params.get('requestid')
          this.company=params.get('company')
          this.date=params.get('date')
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
    const postData = new DeviceInterrogationSubmit(this.UserID, this.requestId,this.device,this.company,this.date,this.answers);
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
    this.stopAudio();
    this.createAnswers( this.question, 'yes');
    this.question =this.questions[this.question.yes.step-1];
    this.buttonConfig();
  }

  noClicked():void{
    this.stopAudio();
    this.createAnswers( this.question, 'no')
    this.question =this.questions[this.question.no.step-1];
    this.buttonConfig();
  }

  nextClicked():void{
    this.stopAudio();
    this.createAnswers( this.question, '');
    this.question =this.questions[this.question.next.step-1];
    this.buttonConfig();
  }

  buttonConfig():void{
    this.next = this.question.next !== undefined && this.question.next !== null;
    this.yes = this.question.yes !== undefined &&this.question.yes !== null;
    this.no = this.question.no !== undefined && this.question.no !== null;
    this.submit =this.question.submit;

    if (this.question.videos !== null && this.question.videos !== undefined && this.question.videos.length > 0)
    {
        this.activeIndex =0;
        this.videoItems  = this.question.videos;
        this.currentVideo = this.videoItems[this.activeIndex];
    } else{
      this.videoItems  = null
    }
  }

  backClicked():void{
    this.stopAudio();
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

