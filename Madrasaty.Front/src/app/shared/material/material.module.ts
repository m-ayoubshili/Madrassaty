import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatTreeModule} from '@angular/material/tree';
import { NestableModule } from 'ngx-nestable';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
     MatToolbarModule,
     MatGridListModule,
     MatFormFieldModule,
     NestableModule,
     MatInputModule,
     MatSlideToggleModule,
     MatRadioModule,
     MatSelectModule,
     DragDropModule,
     CdkTreeModule,
     MatTreeModule,
     MatCheckboxModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatSidenavModule,
     MatButtonModule,
     MatSnackBarModule,
     MatTableModule,
     MatIconModule,
     MatPaginatorModule,
     MatSortModule,
     MatDialogModule,
     MatCardModule,
     MatTooltipModule,
     MatDividerModule
 
  ],
  exports: [
     MatToolbarModule,
     MatGridListModule,
     MatTreeModule,
     MatSlideToggleModule,
     MatInputModule,
     NestableModule,
     MatRadioModule,
     MatSidenavModule,
     CdkTreeModule,
     DragDropModule,
     MatSelectModule,
     MatCardModule,
     MatCheckboxModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatButtonModule,
     MatSnackBarModule,
     MatTableModule,
     MatIconModule,
     MatPaginatorModule,
     MatSortModule,
     MatDialogModule,
     MatTooltipModule,
     MatDividerModule
     
  ],
  declarations: []
})
export class MaterialModule { }
