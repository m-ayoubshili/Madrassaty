import { EvaluationDetailleeComponent } from './session/evaluation-detaillee/evaluation-detaillee.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationComponent } from './evaluation.component';
import { CourseComponent } from './course/course.component';
import { ExamenComponent } from './examen/examen.component';
import { SessionComponent } from './session/session.component';
import { NoteExamenComponent } from './examen/note-examen/note-examen.component';
import { SessionParticipantsComponent } from './session/session-participants/session-participants.component';
import { EvaluationSimpleComponent } from './session/evaluation-simple/evaluation-simple.component';
import { CourseSessionComponent } from './course/course-session/course-session.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationComponent,
    children: [
      {
        path: 'course',
        component: CourseComponent,
      },
      {
        path: 'course/course-session/:Id',
        component: CourseSessionComponent,
      },
      {
        path: 'examen',
        component: ExamenComponent,
      },
      {
        path: 'examen/note-examen/:Id',
        component: NoteExamenComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'session',
        component: SessionComponent,
      },
      {
        path: 'session/participants/:Id',
        component: SessionParticipantsComponent,
      },
      {
        path: 'session/evaluation-detaillee/:Id/:SessionId',
        component: EvaluationDetailleeComponent,
      },
      {
        path: 'session/evaluation-simple/:Id/:SessionId',
        component: EvaluationSimpleComponent,
      }


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
