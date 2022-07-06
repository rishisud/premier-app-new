import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public displayedColumns = ['id', 'name', 'details', 'update', 'delete'];


  public dataSource = new MatTableDataSource<User>();

  constructor() { }
  ngOnInit() {
    this.getAllUsers();
  }
  public getAllUsers = () => {

    //this.dataSource.data = res as User[];
    this.dataSource.data =  [
      {id: 1,role:1,email:'',access_token:''},
    ];

  }
  public redirectToDetails = (id: string) => {
    
  }
  public redirectToUpdate = (id: string) => {
    
  }
  public redirectToDelete = (id: string) => {
    
  }

}
