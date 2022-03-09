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
    {value: 'ECGPHITR1', viewValue: 'ECG PHILIPS'},
    {value: 'ECGASPS12', viewValue: 'ECG ASPEN SMART 12'},
    {value: 'STERLIUNI', viewValue: 'STERLIZING UNIT'},
    {value: 'BPMBPLB18', viewValue: 'BPL 120/80 B18'},
    {value: 'ESUVALFXC', viewValue: 'Valley lab ForceFX-C'},
    {value: 'NEBREAPIS', viewValue: 'READY MIST PISTON COMPRESSOR'}
  ];
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  selectDevice($event:any,){
    this._router.navigate(['/device-interrogation',this.selectedValue,this.requestId]);
  }

  isDisable(): boolean {
    return (this.requestId === null || this.requestId=== undefined) ? true : this.requestId.trim().length <= 0;
  };

}

interface Device {
  value: string;
  viewValue: string;
}
