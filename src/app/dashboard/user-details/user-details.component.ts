import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { User } from 'src/app/model/model';
import { Userdetails } from 'src/app/model/user-details';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  BASE_URL = environment.API_BASE_URL;
  selectedValue!: string;
  user= new Userdetails;
  header = 'Add';
  roles: Role[] = [
    {value: 'Admin', code: 'admin'},
    {value: 'Engineer', code: 'engineer'}
  ]
  constructor(private httpClient: HttpClient, private route :ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('id');
  if(id !== undefined || id !== null){
    this.header='Edit';
  }
    this.httpClient.get<any>(this.BASE_URL+'/engineer/details?userid='+id).subscribe(data =>{
      this.user=data[0];
    })
  }

  
  post():void{

    this.httpClient.post<Userdetails>(this.BASE_URL+'/engineer/save', this.user)
    .pipe(map(res => {
      console.log('Successfully Submitted');
      return res;
    }));
  }

}


interface Role {
  code: string;
  value: string;
}

