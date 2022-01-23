import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  public IsWait: boolean = false;
  public IsValidMessage: string;

  constructor(
	private titleService: Title,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
	private authenticationService: AuthenticationService,
	private toastr: ToastrService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
	
	this.titleService.setTitle('Login');
	  if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  async ngOnInit(): Promise<void> {

  }

  async onSubmit(username: any, passwd: any): Promise<void> {
	console.log(username, passwd);
    this.authenticationService.login(username, passwd)
      .pipe(first())
      .subscribe(
        data => {
          if(data.success) {
            this.toastr.success('Login Successful', '');

            this.authenticationService.userDetails(username)
              .subscribe(resp => {
				console.log(resp.response);
                localStorage.setItem('userdetails' , JSON.stringify(resp.response));
                if (resp.response.role === 'engineer') {
                  this.router.navigate(['/dashboard']);
                } else if (resp.response.role === 'supervisor') {
                  this.router.navigate(['/supervisor']);
                }  
               this.titleService.setTitle('Premier App');
            });
          }
        },
        err => {
          this.IsWait = false;
          this.IsValidMessage = 'Error ' + err.error.error;
          this.toastr.error(this.IsValidMessage, '');
        });
      
  }
}