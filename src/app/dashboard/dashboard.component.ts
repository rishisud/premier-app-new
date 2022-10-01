import { Component, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	role ='admin';
	ngOnInit() {
		this.role = sessionStorage.getItem('currentUser');
	  }
	ngAfterViewInit() { }
	public displayedColumns = ['workorder_id', 'workorder_no', 'equipmentName', 'meNumber', 'action'];
	public completedTabColumns = ['workorder_id', 'workorder_no', 'equipmentName', 'meNumber'];

	public dataSource = new MatTableDataSource<any>();

}
