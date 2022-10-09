import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	role ='admin';
	BASE_URL = environment.API_BASE_URL;
	public displayedColumns = ['workorder_id', 'workorder_no', 'equipmentName', 'meNumber', 'action'];
	public completedTabColumns = ['workorder_id', 'workorder_no', 'equipmentName', 'meNumber'];

	public dataSource = new MatTableDataSource<any>();
	constructor(private httpClient: HttpClient,private _router: Router) { }

	ngOnInit() {
		this.role = sessionStorage.getItem('currentUser');
		this.getAllWorkOrders();
	}
	
	public getAllWorkOrders = () => {
	  this.httpClient.get<any>(this.BASE_URL + '/workorder/details').subscribe(data =>{
		this.dataSource.data = data;
	  })
	}

	ngAfterViewInit() { }

	redirectToDetails(element:any){
		this._router.navigate(['/device-interrogation',element.meNumber,element.workorder_id]);
	  }

}
