import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkOrder, WorkOrderDetails } from 'src/app/model/work-order-details-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent implements OnInit {
  BASE_URL = environment.API_BASE_URL;
  public displayedColumns = ['workorder_id', 'device', 'engineer', 'details'];


  public dataSource = new MatTableDataSource<WorkOrder>();

  constructor(private httpClient: HttpClient,private router: Router) { }
  ngOnInit() {
    this.getAllWorkOrders();
  }
  public getAllWorkOrders = () => {
    this.httpClient.get<WorkOrder[]>(this.BASE_URL + '/workorder/details').subscribe(data =>{
      this.dataSource.data = data;
    })
  }
  public redirectToDetails = (id: string) => {
    this.router.navigate(['/work-order-details'], { queryParams: { id: id }} );
  }
  public redirectToUpdate = (id: string) => {
    
  }
}
