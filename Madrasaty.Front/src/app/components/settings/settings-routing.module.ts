import { HolidayComponent } from './holiday/holiday.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolComponent } from './school/school.component';
import { SchoolYearComponent } from './school-year/school-year.component';
import { SettingsComponent } from './settings.component';
import { MembersComponent } from './members/members.component';
import { TajwidErrorComponent } from './tajwid-error/tajwid-error.component';
import { DisciplineComponent } from './discipline/discipline.component';
import { ClassroomListComponent } from './classroom/classroom-list/classroom-list.component';
import { LevelComponent } from './level/level.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'school',
        component: SchoolComponent,
      },

      {
        path: 'schoolyear',
        component: SchoolYearComponent,
      },
      {
        path: 'holiday',
        component: HolidayComponent,
      },
      {
        path: 'member',
        component: MembersComponent,
      },
      {
        path: 'classes',
        component: LevelComponent,
      },
      {
        path: 'classroom',
        component: ClassroomListComponent,
      }
      ,
      {
        path: 'Discipline',
        component: DisciplineComponent,
      }
      ,
      {
        path: 'tajwid-error',
        component: TajwidErrorComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
