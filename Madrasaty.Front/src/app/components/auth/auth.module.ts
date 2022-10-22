import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { UserService } from 'src/app/services/user.service';

import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from 'src/app/services/register.service';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    AuthComponent,
    ConfirmEmailComponent,
    ChangePasswordComponent,

  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDatepickerModule,
    MaterialModule,

    HttpClientModule, ],
    providers:[UserService, RegisterService,MembersListService ]

})
export class AuthModule {}
