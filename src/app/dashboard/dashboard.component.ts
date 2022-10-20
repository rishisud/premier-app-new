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
	engineerId:string;
	workOrderStatus=0;
	BASE_URL = environment.API_BASE_URL;
	public displayedColumns = ['woid', 'wono', 'equipment_name', 'menumber', 'action'];
	public completedTabColumns = ['woid', 'wono', 'equipment_name', 'menumber'];

	public dataSource = new MatTableDataSource<any>();
	constructor(private httpClient: HttpClient,private _router: Router) { }

	ngOnInit() {
		this.role = sessionStorage.getItem('currentUser');
		let jsonObj = JSON.parse(localStorage.userdetails);
		this.engineerId = jsonObj.user_details[0]?.engineerid;
		this.getAllWorkOrders(this.workOrderStatus);
	}
	
	public getAllWorkOrders(workOrderStatus:Number) {
	  let eId = this.role =='admin'? this.role :this.engineerId;
	  this.httpClient.get<any>(this.BASE_URL + '/getwodetails?engineerId='+eId+'&status='+workOrderStatus).subscribe(data =>{
		this.dataSource.data = data;
	  })
	}

	tabClick(tab) {
		this.getAllWorkOrders(tab.index);
	  }

	ngAfterViewInit() { }

	redirectToDetails(element:any){
		this._router.navigate(['/device-interrogation',element.workflow_id,element.woid,element.company,element.service_date]);
	  }

}
