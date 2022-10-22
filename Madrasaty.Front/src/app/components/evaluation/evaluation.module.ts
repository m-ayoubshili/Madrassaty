
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationComponent } from './evaluation.component';
import { CourseComponent } from './course/course.component';
import { ExamenComponent } from './examen/examen.component';
import {CalendarComponent} from './calendar/calendar.component'
import { SessionComponent } from './session/session.component';
import { MaterialModule } from './../../shared/material/material.module';
import { TimepickerModule }from 'ngx-bootstrap/timepicker';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { DatepickerModule, BsDatepickerModule, DatePickerComponent } from 'ngx-bootstrap/datepicker';
import { ExamensService } from 'src/app/services/Examens/examens.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolyearService } from 'src/app/services/schoolyear/schoolyear.service';
import { PeriodicityService } from 'src/app/services/periodicity/periodicity.service';
import { SharedHeaderModule } from 'src/app/shared/shared-header/shared-header.module';
import { CourseService } from 'src/app/services/course/course.service';
import { LevelService } from 'src/app/services/level/level.service';
import { DisciplineService } from 'src/app/services/discipline/discipline.service';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import { SharedDrawerModule } from 'src/app/shared/shared-drawer/shared-drawer.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { NoteExamenComponent } from './examen/note-examen/note-examen.component';
import { SessionParticipantsComponent } from './session/session-participants/session-participants.component';
import { EvaluationSimpleComponent } from './session/evaluation-simple/evaluation-simple.component';
import { EvaluationDetailleeComponent } from './session/evaluation-detaillee/evaluation-detaillee.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TajwidSubErrorsComponent } from './session/evaluation-detaillee/tajwid-sub-errors/tajwid-sub-errors.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EvaluationsEtudiantService } from 'src/app/services/evaluations-etudiant/evaluations-etudiant.service';

import {NgxPaginationModule} from 'ngx-pagination';
import { CourseSessionComponent } from './course/course-session/course-session.component';
import { AssiduiteService } from 'src/app/services/assiduite/assiduite.service';


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
    NoteExamenComponent,
    SessionParticipantsComponent,
    EvaluationSimpleComponent,
    EvaluationDetailleeComponent,
    TajwidSubErrorsComponent,
    CourseSessionComponent,
 
  ],
  imports: [
    CommonModule, 
    NgbModule,
    MaterialModule,
    MatDatepickerModule,
    MatInputModule,
    Ng2SearchPipeModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    InlineSVGModule,
    FullCalendarModule ,
    EvaluationRoutingModule,   
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedHeaderModule,
    SharedDrawerModule,
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),  
    RatingModule.forRoot()
    
  ],providers:[ExamensService ,SchoolyearService,
    PeriodicityService,
     CourseService,
     LevelService,
     EvaluationsEtudiantService,
     BsModalService ,
     DisciplineService,
     ClassroomService,AssiduiteService ]
})
export class EvaluationModule { }
