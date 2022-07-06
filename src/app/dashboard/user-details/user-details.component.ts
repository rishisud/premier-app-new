import { Component, OnInit } from '@angular/core';
import { Userdetails } from 'src/app/model/user-details';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  selectedValue!: string;
  user= new Userdetails;
  roles: Role[] = [
    {value: 'Admin', code: 'admin'},
    {value: 'Engineer', code: 'engineer'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

  
  post():void{
  }

}


interface Role {
  code: string;
  value: string;
}

