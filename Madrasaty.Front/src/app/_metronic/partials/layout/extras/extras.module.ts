import { AppResolverService } from './../../../../services/app-resolver.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { NotificationsInnerComponent } from './dropdown-inner/notifications-inner/notifications-inner.component';
import { QuickLinksInnerComponent } from './dropdown-inner/quick-links-inner/quick-links-inner.component';
import { UserInnerComponent } from './dropdown-inner/user-inner/user-inner.component';
import { LayoutScrollTopComponent } from './scroll-top/scroll-top.component';
import { TranslationModule } from '../../../../components/i18n';
import { UserService } from 'src/app/services/user.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { SchoolyearService } from 'src/app/services/schoolyear/schoolyear.service';
import { DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [
    NotificationsInnerComponent,
    QuickLinksInnerComponent,
    UserInnerComponent,
    LayoutScrollTopComponent,
    
  ],
  imports: [CommonModule, InlineSVGModule, RouterModule, TranslationModule,MaterialModule],
  exports: [
    NotificationsInnerComponent,
    QuickLinksInnerComponent,
    UserInnerComponent,
    LayoutScrollTopComponent,
  ],
  providers:[UserService,
    MembersListService,
   SchoolyearService,
   DatePipe,
   AppResolverService
  ]
})
export class ExtrasModule {}
