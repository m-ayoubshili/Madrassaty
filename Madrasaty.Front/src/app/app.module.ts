import { SettingsHeaderComponent } from './shared/settings-header/settings-header.component';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { UserService } from './services/user.service';

import { MaterialModule } from './shared/material/material.module';

import { AuthGuard } from './components/auth/authGard/auth.guard';
import { SettingsHeaderModule } from './shared/settings-header/settings-header.module';
import { SignalrService } from './services/RealTime-signalR/signalr.service';
import { MessageService } from './services/message/message.service';
import { MessageGroupService } from './services/messageGroup/messageGroup.service';
import { MembersListService } from './services/members/members-list.service';
import { MemberConnectionIdService } from './services/RealTime-signalR/member-connectionId.service';

/*
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
} */

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    MaterialModule,
    NgbModalModule,
    NgbDatepickerModule,
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    SettingsHeaderModule,

    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [
    UserService,
    AuthGuard,
    MemberConnectionIdService,
    MembersListService,
    SignalrService,
    MessageService,
    MessageGroupService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
