import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSharedComponent } from './shared-header.component';
import { MaterialModule } from '../material/material.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedDrawerModule } from '../shared-drawer/shared-drawer.module';
import { SharedButtonsComponent } from '../shared-buttons/shared-buttons.component';


@NgModule({
  declarations: [
    HeaderSharedComponent,
    SharedButtonsComponent
  ],
  imports: [
    CommonModule,    
    MaterialModule,
    InlineSVGModule,
    SharedDrawerModule,
    
  ],
  exports:[HeaderSharedComponent,SharedButtonsComponent]
})
export class SharedHeaderModule { }
