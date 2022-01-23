import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeviceInterrogationSubmit } from '../model/device-interrogation.submit.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceInterrogationService {
  BASE_URL = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  postData(username: string, deviceInfo: DeviceInterrogationSubmit) {
    let data = { username: username, deviceInfo: deviceInfo };
	  console.log(this.BASE_URL);
    return this.http.post<any>(this.BASE_URL + '/engineer/save', data)
      .pipe(map(res => {
        //console.log(res);
        return res;
      }));
  }
}
