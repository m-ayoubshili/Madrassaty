import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';

import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'admin@admin.com',
    password: 'passer',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService
  ) {

    // redirect to home if already logged in

  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

 

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  get emailAdresse()
{
return this.loginForm.get('emailAdresse');
}
get password()
{
return this.loginForm.get('password');
}

loginUser() {
  //console.log(this.loginForm.value);
  this.userService.getUserToken(this.loginForm.value).subscribe((
    reqData:any[])=>{

    this.userService.setUserLoggedIn();
    localStorage.setItem('currentUser', JSON.stringify(reqData));

    this.router.navigate([this.returnUrl]);
    //this.router.navigate(['/dashboard']);
    },
    (error : HttpErrorResponse)=>{
      Swal(
      'Erreur',
      'Email ou mot de passe incorrect',
       'error');
    })
}
}
