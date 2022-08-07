import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/model/model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  BASE_URL = environment.API_BASE_URL;
  public displayedColumns = ['empid', 'name', 'details', 'delete'];


  public dataSource = new MatTableDataSource<User>();

  constructor(private httpClient: HttpClient,private router: Router) { }
  ngOnInit() {
    this.getAllUsers();
  }
  public getAllUsers = () => {
    this.httpClient.get<User[]>(this.BASE_URL + '/all-engineer/details').subscribe(data =>{
      this.dataSource.data = data;
    })
  }
  public redirectToDetails = (id: string) => {
    this.router.navigate(['/user-details']);
  }
  public redirectToUpdate = (id: string) => {
    
  }
  public redirectToDelete = (id: string) => {
    
  }

}
