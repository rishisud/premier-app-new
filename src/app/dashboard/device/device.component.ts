import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  selectedValue: string = '0';
  requestId!: string;
  devices: Device[] = [
    {value: 'None', viewValue: 'None'},
    {value: 'ECGBPL610', viewValue: 'ECG BPL 610'},
    {value: 'ECGPhilips', viewValue: 'ECG Philips'},
  ];
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  selectDevice($event:any,){
    this._router.navigate(['/device-interrogation',this.selectedValue,this.requestId]);
  }

}

interface Device {
  value: string;
  viewValue: string;
}
