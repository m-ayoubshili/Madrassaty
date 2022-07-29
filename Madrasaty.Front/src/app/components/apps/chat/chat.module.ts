import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from '../chat/chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { DrawerChatComponent } from './drawer-chat/drawer-chat.component';
import {
  DropdownMenusModule,
  ChatInnerModule,
  CardsModule,
} from '../../../_metronic/partials';
import { MessageComponent } from '../../../_metronic/partials/content/chat-inner/message/message.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SettingsHeaderComponent } from 'src/app/shared/settings-header/settings-header.component';
import { SettingsHeaderModule } from 'src/app/shared/settings-header/settings-header.module';
import { SettingsComponent } from '../../settings/settings.component';
import { SettingsModule } from '../../settings/settings.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ChatComponent,
    PrivateChatComponent,
    GroupChatComponent,
    DrawerChatComponent,

  ],
  imports: [
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    ChatRoutingModule,
    DropdownMenusModule,
    ChatInnerModule,
    UiSwitchModule,
    Ng2SearchPipeModule,
    MaterialModule,
    CardsModule,
    InlineSVGModule,
  ],
})
export class ChatModule {}
