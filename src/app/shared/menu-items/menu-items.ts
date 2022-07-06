import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const engineerMENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard'},
  { state: 'device', name: 'Device', type: 'link', icon: 'devices' },
];

const adminMENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard'},
  { state: 'device', name: 'Device', type: 'link', icon: 'devices'},
  { state: 'user-list', name: 'Users', type: 'link', icon: 'user'}
];

const LOGINMENUITEMS = [
  { state: 'login', name: 'Login', type: 'link', icon: 'login' },
];

@Injectable()
export class MenuItems {
  getMenuitem(login:boolean,role:string): Menu[] {
    return login ? (role==='admin'? adminMENUITEMS:engineerMENUITEMS) :LOGINMENUITEMS;
  }
}
