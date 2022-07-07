import { Component, OnInit } from '@angular/core';
import { Engineer } from 'src/app/model/work-order-details-model';

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnInit {
  selectedDeviceValue: string = '0';
  requestId!: string;
  devices: Device[];
  selectedValue!: string;
  user: Engineer[];
  constructor() { }

  ngOnInit(): void {
  }

    
  post():void{
  }


}

