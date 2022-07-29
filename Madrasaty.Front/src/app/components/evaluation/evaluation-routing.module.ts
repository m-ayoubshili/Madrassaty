import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationComponent } from './evaluation.component';
import { CourseComponent } from './course/course.component';
import { ExamenComponent } from './examen/examen.component';
import { SessionComponent } from './session/session.component';

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
        path: 'examen',
        component: ExamenComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'session',
        component: SessionComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
