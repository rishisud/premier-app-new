import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
//import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	@Input() editable: boolean = false;
	public roomForm: FormControl;
	public version = require('../../../../package.json').version;

	constructor(private router: Router, public formBuilder: FormBuilder) {}

	ngOnInit() {
		//const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], separator: '-', });
		const randomName = 'Classroom-1A';
		this.roomForm = new FormControl(randomName, [Validators.minLength(4), Validators.required]);
	}

	public goToVideoCall() {
		if (this.roomForm.valid) {
			//const roomName = this.roomForm.value.replace(/ /g, '-'); // replace white spaces by -
			const roomName = this.roomForm.value;
			this.roomForm.setValue(roomName);
			//this.router.navigate(['/online', roomName]);
			this.router.navigate(['/online'], { queryParams: { roomName: roomName }} );
		}
	}
}
