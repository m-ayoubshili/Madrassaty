
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

import { SharedHeaderModule } from './shared/shared-header/shared-header.module';



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
    SharedHeaderModule,
    InlineSVGModule.forRoot(),
    NgbModule,
  ],
  providers: [UserService,
    AuthGuard

  ],
 
  bootstrap: [AppComponent],
  
})
export class AppModule {}
