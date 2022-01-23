import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { User } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  BASE_URL = environment.API_BASE_URL;

  public user: User;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  @Output() userIsLoggedIn: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(private http: HttpClient) { 
	this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(JSON.stringify(sessionStorage.getItem('currentUser'))));
    this.currentUser = this.currentUserSubject.asObservable();
	console.log(this.currentUser);
  }
  
  public get currentUserValue() {
    let role = sessionStorage.getItem('currentUser');
    return role;
  }

  login(username: string, password: string) {
    let data = { username: username, password: password };
    console.log(data);
	console.log(this.BASE_URL);
    return this.http.post<any>(this.BASE_URL + '/login', data)
      .pipe(map(res => {
        //console.log(res);
        if(res.token){
          sessionStorage.setItem('token', res.token);
        }
        this.userIsLoggedIn.emit(true);
        return res;
      }));
  }

  userDetails(name: any) {
    console.log('userDetails');
    // return 'test';
	//console.log(this.tokenHeader());
	return this.http.get<any>(this.BASE_URL + '/me', this.tokenHeader())
      .pipe(map(res => {
        // define dashboard role as static
		console.log(res);
        let roles = res.response.role ? res.response.role : 'admin';
        sessionStorage.setItem('currentUser', roles);
        this.currentUserSubject.next(roles);
        return res;
    }));
  }

  tokenHeader() {
    let authToken = sessionStorage.getItem('token');
	console.log('Token', authToken)
    //authToken = 'Bearer 34234234234234';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authToken
      })
    };
	return httpOptions;
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('isLoggedin');
    //this.currentUserSubject.next(null);
  }

  IsLoggedIn() { 
    return this.userIsLoggedIn; 
  } 
}
