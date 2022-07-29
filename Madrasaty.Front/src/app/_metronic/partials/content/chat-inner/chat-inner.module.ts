import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { ChatInnerComponent } from './chat-inner.component';
import { MessageComponent } from 'src/app/_metronic/partials/content/chat-inner/message/message.component';

@NgModule({
  declarations: [ChatInnerComponent,MessageComponent],
  imports: [CommonModule, InlineSVGModule],
  exports: [ChatInnerComponent],
})
export class ChatInnerModule {}
