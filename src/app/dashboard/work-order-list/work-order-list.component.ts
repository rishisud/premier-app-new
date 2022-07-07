import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WorkOrder, WorkOrderDetails } from 'src/app/model/work-order-details-model';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent implements OnInit {

  public displayedColumns = ['id', 'device', 'engineer', 'details', 'update'];


  public dataSource = new MatTableDataSource<WorkOrder>();

  constructor() { }
  ngOnInit() {
    this.getAllWorkOrders();
  }
  public getAllWorkOrders = () => {

    //this.dataSource.data = res as User[];
    this.dataSource.data =  [{id:1,device:'ECG BPL',engineer:'Santhosh'}];

  }
  public redirectToDetails = (id: string) => {
    
  }
  public redirectToUpdate = (id: string) => {
    
  }
}
