import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { first } from 'rxjs/operators';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];
  constructor(private fb: FormBuilder,  private registerService:RegisterService) {
    //this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [
        'admin@demo.com',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), 
        ]),
      ],
    });
  }


  submit() {
    this.errorState = ErrorStates.NotSubmitted;

    let email=this.forgotPasswordForm.get('email').value
    var data = { ...data,email:email};

    const forgotPasswordSubscr = this.registerService
      .SetPassword(data)
      .pipe(first())
      .subscribe((result: boolean) => {
        this.errorState = result ? ErrorStates.NoError : ErrorStates.HasError;
      });
      console.log(this.errorState)
    this.unsubscribe.push(forgotPasswordSubscr);
  }
}
