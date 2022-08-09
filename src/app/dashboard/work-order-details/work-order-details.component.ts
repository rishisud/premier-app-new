import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/model/device.model';
import { Engineer, WorkOrderDetails } from 'src/app/model/work-order-details-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnInit {
  BASE_URL = environment.API_BASE_URL;
  header = 'Add';
  selectedDeviceValue: string = '0';
  requestId!: string;
  devices: Device[];
  selectedValue!: string;
  engineers: Engineer[];
  workOrder= new WorkOrderDetails;
  constructor(private httpClient: HttpClient, private route :ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('id');
    if(id !== undefined || id !== null){
      this.header='Edit';
    }
      this.httpClient.get<any>(this.BASE_URL+'/workorderbyid/details?workorderId='+id).subscribe(data =>{
        this.workOrder=data[0];
      })
  }

    
  post():void{
  }


}

