import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplineListComponent } from './discipline-list.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'app/components/authentification/auth/auth.guard';
import { BasicLayoutComponent } from 'app/components/common/layouts/basicLayout.component';
import { DisciplineService } from 'app/services/discipline/discipline.service';
import { DisciplineEditComponent } from './discipline-edit.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LevelAddComponent } from '../level/level-add.component';
import { AgGridModule } from 'ag-grid-angular';
import { DisciplineRowLevelsComponent } from './discipline-row/discipline-row-levels.component';
import { BtnUpdateDeleteComponent } from 'app/components/common/btn-update-delete.component';
import { AuthRoot } from 'app/components/authentification/auth/auth.root';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([DisciplineRowLevelsComponent,BtnUpdateDeleteComponent]),
    RouterModule.forChild([
      {  path: 'setting', component: BasicLayoutComponent,
         children: [
        {path: 'discipline', component: DisciplineListComponent,canActivate:[AuthGuard,AuthRoot]}]
      }
    ])
  ],
  entryComponents: [
    DisciplineEditComponent,LevelAddComponent
],
  declarations: [DisciplineListComponent, DisciplineEditComponent, DisciplineRowLevelsComponent,BtnUpdateDeleteComponent ],
  providers: [DisciplineService,BsModalService]
})
export class DisciplineModule { }
