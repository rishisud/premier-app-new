import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuItems } from '../../shared/menu-items/menu-items';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  routerPath:string='';
  loggedInSuccess = false;
  role ='admin';
  private _mobileQueryListener: () => void;

  ngOnInit() { 
    this.authenticationService.IsLoggedIn().subscribe(() => { 
      this.loggedInSuccess = true;
    });
  } 

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems, private router: Router, private authenticationService: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.routerPath = router.url;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}

  routerlinkCheck():boolean{
    this.role = sessionStorage.getItem('currentUser');
    return this.loggedInSuccess ? this.loggedInSuccess : this.routerPath !=='/login' && this.routerPath !=='/' ;
  }
}
