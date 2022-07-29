
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationComponent } from './evaluation.component';
import { CourseComponent } from './course/course.component';
import { ExamenComponent } from './examen/examen.component';
import {CalendarComponent} from './calendar/calendar.component'
import { SessionComponent } from './session/session.component';
import { MaterialModule } from './../../shared/material/material.module';

import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { SettingsHeaderComponent } from 'src/app/shared/settings-header/settings-header.component';
import { ExamensService } from 'src/app/services/Examens/examens.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolyearService } from 'src/app/services/schoolyear/schoolyear.service';
import { PeriodicityService } from 'src/app/services/periodicity/periodicity.service';

FullCalendarModule.registerPlugins([  
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
 
    CourseComponent,
    ExamenComponent,
    SessionComponent,
    CalendarComponent,
    EvaluationComponent,
    
 

  ],
  imports: [
    CommonModule, 
    MaterialModule,
    FullCalendarModule ,
    EvaluationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],providers:[ExamensService ,SchoolyearService,PeriodicityService ]
})
export class EvaluationModule { }
