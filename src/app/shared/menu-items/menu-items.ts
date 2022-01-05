import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard' },
  { state: 'device', name: 'Device', type: 'link', icon: 'devices' }
];

const LOGINMENUITEMS = [
  { state: 'login', name: 'Login', type: 'link', icon: 'login' },
];

@Injectable()
export class MenuItems {
  getMenuitem(login:boolean): Menu[] {
    return login ?MENUITEMS:LOGINMENUITEMS;
  }
}
