import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'confirm-email',
        component: ConfirmEmailComponent,
      }
      ,
      {
        path: 'change-password/:Id',
        component: ChangePasswordComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
