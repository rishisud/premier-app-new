import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DeviceInterrogation, Question } from 'src/app/model/device-interrogation.model';
import * as internal from 'stream';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-device-interrogation',
  templateUrl: './device-interrogation.component.html',
  styleUrls: ['./device-interrogation.component.css']
})
export class DeviceInterrogationComponent implements OnInit {
  device: any;
  questions: Question[]=[];
  question: any;
  constructor(private httpClient: HttpClient, private _router: ActivatedRoute) { }

  ngOnInit(): void {
    this._router.paramMap.subscribe(params=>{
          this.device=params.get('device')
    })

    this.httpClient.get<DeviceInterrogation>('assets/json/'+this.device+'.json').subscribe(data =>{
      this.questions = data.questions;
      this.question=this.questions[0];
    })
  }

  yesClicked():void{
    this.question =this.questions[this.question.yes.step-1]
  }

  noClicked():void{
    this.question =this.questions[this.question.no.step-1]
  }

  backClicked():void{
    this.question =this.questions[this.question.step - 1]
  }

  isNull(value:any):boolean{
    return value !== null && value !== undefined
  }
}
function input() {
  throw new Error('Function not implemented.');
}

