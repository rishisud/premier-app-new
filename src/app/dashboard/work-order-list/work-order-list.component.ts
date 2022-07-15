import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkOrder, WorkOrderDetails } from 'src/app/model/work-order-details-model';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent implements OnInit {

  public displayedColumns = ['id', 'device', 'engineer', 'details'];


  public dataSource = new MatTableDataSource<WorkOrder>();

  constructor(private router: Router) { }
  ngOnInit() {
    this.getAllWorkOrders();
  }
  public getAllWorkOrders = () => {

    //this.dataSource.data = res as User[];
    this.dataSource.data =  [{id:1,device:'ECG BPL',engineer:'Santhosh'}];

  }
  public redirectToDetails = (id: string) => {
    this.router.navigate(['/work-order-details']);
    
  }
  public redirectToUpdate = (id: string) => {
    
  }
}
