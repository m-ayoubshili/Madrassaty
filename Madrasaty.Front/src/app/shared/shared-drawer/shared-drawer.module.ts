import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineSVGModule } from 'ng-inline-svg';
import { SharedDrawerComponent } from './shared-drawer.component';
import { SharedButtonsComponent } from '../shared-buttons/shared-buttons.component';



@NgModule({
  declarations: [
    SharedDrawerComponent,
 
  ],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports:[SharedDrawerComponent]
})
export class SharedDrawerModule { }
