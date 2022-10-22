import { UserService } from 'src/app/services/user.service';
import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from '../account/account.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileDetailsComponent } from './settings/forms/profile-details/profile-details.component';
import { ConnectedAccountsComponent } from './settings/forms/connected-accounts/connected-accounts.component';
import { DeactivateAccountComponent } from './settings/forms/deactivate-account/deactivate-account.component';
import { EmailPreferencesComponent } from './settings/forms/email-preferences/email-preferences.component';
import { NotificationsComponent } from './settings/forms/notifications/notifications.component';
import { SignInMethodComponent } from './settings/forms/sign-in-method/sign-in-method.component';
import { DropdownMenusModule, WidgetsModule } from '../../_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { StripeComponent } from './stripe/stripe.component';
import { NgxStripeModule } from 'ngx-stripe';




@NgModule({
  declarations: [
    AccountComponent,
    OverviewComponent,
    SettingsComponent,
    ProfileDetailsComponent,
    ConnectedAccountsComponent,
    DeactivateAccountComponent,
    EmailPreferencesComponent,
    NotificationsComponent,
    SignInMethodComponent,
    StripeComponent,
 
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    MaterialModule,
   
    NgbDatepickerModule,
    NgxStripeModule.forRoot('pk_test_51Ksla8H1ud48pyOPeASTZ4Xy0wpENbfmW7Cl2ocTxKq0Jx9XQT4GRMLqd0iCf8glTZMQOBLX3YLcMfAYVAjKtIlu00Taq1xkO8'),
  ],
  providers:[MembersListService,UserService]
})
export class AccountModule {}
