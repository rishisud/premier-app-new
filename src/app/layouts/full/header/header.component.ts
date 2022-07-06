import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
	user: any;
	constructor(private router: Router, private authenticationService: AuthenticationService, private _route: ActivatedRoute) {}
	
	ngOnInit() {}
	
  redirectToChangePassword() {
    this.router.navigate(['/change-password']);
  }
	logOut() {
    this.authenticationService.logout();
    this.user = '';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/']);
  }
}
