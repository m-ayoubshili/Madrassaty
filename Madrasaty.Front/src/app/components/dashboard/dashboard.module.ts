import { MaterialModule } from 'src/app/shared/material/material.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WidgetsModule } from '../../_metronic/partials';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

FullCalendarModule.registerPlugins([  
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  
]);
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FullCalendarModule,
    InlineSVGModule,
    NgApexchartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
  ],
})
export class DashboardModule {}
