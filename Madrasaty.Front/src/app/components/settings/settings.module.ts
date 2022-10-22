import { DisciplineComponent } from './discipline/discipline.component';
import { LevelComponent } from './level/level.component';
import { HolidaysService } from './../../services/holidays/holidays.service';

import { MaterialModule } from './../../shared/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { SettingsRoutingModule } from './settings-routing.module';
import { SchoolYearComponent } from './school-year/school-year.component';
import { SchoolComponent } from './school/school.component';
import { SettingsComponent } from './settings.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { ToolbarComponent } from 'src/app/_metronic/layout/components/toolbar/toolbar.component';
import { SchoolService } from 'src/app/services/school/school.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderSharedComponent } from 'src/app/shared/shared-header/shared-header.component';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HolidayComponent } from './holiday/holiday.component';
import { MAT_RADIO_DEFAULT_OPTIONS_FACTORY } from '@angular/material/radio';

import { MembersComponent } from './members/members.component';
import { TajwidErrorComponent } from './tajwid-error/tajwid-error.component';
import { ClassroomListComponent } from './classroom/classroom-list.component';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import { DisciplineService } from 'src/app/services/discipline/discipline.service';
import { LevelService } from 'src/app/services/level/level.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { AgGridModule } from 'ag-grid-angular';
import { BtnUpdateDeleteComponent } from 'src/app/shared/btn-update-delete/btn-update-delete.component';
import { LevelChildComponent } from './level/level-child/level-child.component';

import { SharedHeaderModule } from 'src/app/shared/shared-header/shared-header.module';
import { WidgetsModule } from 'src/app/_metronic/partials/content/widgets/widgets.module';
import { DrawersModule } from 'src/app/_metronic/partials';
import { SharedDrawerModule } from 'src/app/shared/shared-drawer/shared-drawer.module';




@NgModule({
  declarations: [
    SchoolYearComponent,
    SchoolComponent,
    SettingsComponent,     
    HolidayComponent,
    LevelComponent,
    ClassroomListComponent,
    DisciplineComponent,     
    MembersComponent,
    TajwidErrorComponent,
    BtnUpdateDeleteComponent,
    LevelChildComponent,
  
   

  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    InlineSVGModule,
    MaterialModule,
    UiSwitchModule,
    Ng2SearchPipeModule,
    SharedHeaderModule,
    WidgetsModule,

    SharedDrawerModule,
   AgGridModule.withComponents(null)
  ] ,providers: [SchoolService,
    ClassroomService,
    LevelService,
    DisciplineService,
    HolidaysService,
  MembersListService],


})
export class SettingsModule { }
