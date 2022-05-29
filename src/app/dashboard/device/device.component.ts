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
    {value: 'LEDPHOPHO', viewValue: 'PHOTOLUX'},
    {value: 'ESUVALFXC', viewValue: 'Valley lab ForceFX-C'},
    {value: 'CPAPHIREM', viewValue: 'RESPRONICS -PHILIPS'},
    {value: 'CENREMR4C', viewValue: 'REMI - R 4C'},
    {value: 'NEBREAPIS', viewValue: 'READY MIST PISTON COMPRESSOR'},
    {value: 'HUMFIS810', viewValue: 'Fisher & Paykel MR810'},
    {value: 'INFFREOVS', viewValue: 'FRESENIUS OPTIMA VS'},
    {value: 'MUSBIO103', viewValue: 'BIO-MED INC. – BMI 1033'},
    {value: 'PATSCHTRU', viewValue: 'SCHILLER -TRUESCOPE ll'},
    {value: 'PULNEL560', viewValue: 'NELLCOR OXIMAX N – 560'},
    {value: 'SEMMER300', viewValue: 'Merck -MICRO LAB -300'},
    {value: 'SUCINSPRE', viewValue: 'INSTAVAC PREMIUM'},
    {value: 'SYRBBAPER', viewValue: 'B BARUN PERFUSSOR COMPACT'},
    {value: 'ULTSON100', viewValue: 'SONOSCAPE SSI1000'},
    {value: 'DEFHEARXL', viewValue: 'HEART START XL'},
    {value: 'NEBREAPIS', viewValue: 'READY MIST PISTON COMPRESSOR'},
    {value: 'CTGBPLFM985', viewValue: 'BPL – FM 9853'},
    {value: 'DXRCONWMOU', viewValue: 'CONFIDENT – WHOLE MOUNT'},
    {value: 'FMCONCMSG1', viewValue: 'CONTEC – CMS800G1'},
    {value: 'SEMAAMEURA', viewValue: 'MEDSOURCE – URA'},
    {value: 'DEFBPLDF2', viewValue: 'BPL DF 2509'},
    {value: 'ECGBIOCAR2', viewValue: 'BIONET – Cardio Care 2000'},
    {value: 'DIGULTRAMED', viewValue: 'MEDITEK ELECTRONICS'},
    {value: 'ECGBPL6208', viewValue: 'BPL – CARDIDART 6208'},
    {value: 'ECGMACM', viewValue: 'ECGMAC EM – 301'},
    {value: 'TENSBIOMUL', viewValue: 'BIO MED INC – MULTIFUNCTION 4 CH TENS'}
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
