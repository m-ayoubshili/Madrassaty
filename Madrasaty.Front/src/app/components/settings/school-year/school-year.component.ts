import { DatePipe } from '@angular/common';
import { Component,  ElementRef,  OnInit, ViewChildren } from '@angular/core';
import 'rxjs/add/operator/map';

import { SchoolYear } from 'src/app/models/schoolyear';
import { SchoolyearService } from 'src/app/services/schoolyear/schoolyear.service';
import { GridOptions } from 'ag-grid-community';
import swal from 'sweetalert2';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/generic-validator';

import { etat } from 'src/app/models/etat';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.scss']
})
export class SchoolYearComponent implements OnInit {
  schoolYears: SchoolYear[];
  errorMessage: string;
  schoolYear:SchoolYear;
  columnDefs
  rowData
  domLayout: string;
  gridOptions: GridOptions;
  paginationPageSize: number;
  localeText;
  editType: string;
  editingRowIndex: any;
  gridColumnApi;
  gridApi;
  switchbtn: boolean=false;
  search:string;
  DialogTitle: string;
  schoolYearForm: FormGroup;
  constructor(private notification: NotificationService ,private formBuilder: FormBuilder,private datePipe:DatePipe ,private schoolyearService: SchoolyearService 
    ) { }

    ngOnInit() {
      this.schoolYearForm = this.formBuilder.group({
        description: ["", Validators.required],
        StartDay: ["", Validators.required],
        EndDay: ["", Validators.required],
      });
      this.refreshSchoolYearList()
  
    }

  searchResult(data){
    this.search=data
  }
  
  OpenDiag(id: number) {  
    this.DialogTitle = id == -1 ? "Ajouter année scolaire"  : "Modifier année scolaire"
    this.schoolyearService.getSchoolYear(id)
      .subscribe({
        next: (schoolYear: SchoolYear) => this.displaySchoolYears(schoolYear),
        error: err => console.log(err)
      });
  

}


  dataGridInit() {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      },

    };
    this.localeText = {
      next: 'Suivant',
      to: 'à',
      of: 'sur',
      contains: 'Contient',
      notContains: 'Ne contient pas',
      startsWith: 'Commence par',
      endsWith: 'Finis par',
      equals: 'Egale à',
      notEqual: 'Différent de',
    }
    this.paginationPageSize = 10;
    this.editType = "fullRow";
    this.domLayout = 'autoHeight';
    this.columnDefs =
      [
        { headerName: 'Description', field: 'description', sortable: true, filter: true, resizable: true },
        {
          headerName: 'StartDay', field: 'StartDay', sortable: true, filter: true, resizable: true, cellRenderer: (data) => {
            return data.value ? this.datePipe.transform(data.value, 'dd/MM/yyyy')  : '';
          }
        },
        {   headerName: 'EndDay', field: 'EndDay', sortable: true, filter: true, resizable: true, cellRenderer: (data) => {
            return data.value ? this.datePipe.transform(data.value, 'dd/MM/yyyy'): '';
          }
        },      
      ]; } 



  displaySchoolYears(schoolYear :SchoolYear) : void{
    if (this.schoolYearForm) {
      this.schoolYearForm.reset();
    }
    this.schoolYear =schoolYear 
    this.schoolYearForm.patchValue({
      description: this.schoolYear.description,
      StartDay: this.schoolYear.StartDay,
      EndDay: this.schoolYear.EndDay
     
    });
  }
  getActive(key){
    return etat[key]
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }



  refreshSchoolYearList() {
    this.schoolyearService.getSchoolYears().map(item => {
      return item.map(s => {
        s.StartDay = new Date(s.StartDay + "Z")
        s.EndDay = new Date(s.EndDay + "Z")
        return s
      })
    })
      .subscribe(
        {
          next: schoolYearList => {this.rowData= schoolYearList},
          error: err => this.errorMessage = err
        });
  }
  onSetActifComplete() {
    swal({
      position: 'top',
      title: "Modification de l'année scolaire en cours avec succès",
      type: 'success',
      showConfirmButton: false,
      timer: 2000,
      toast: true,

    });
  }
  setActifSchoolYear(Id: number) {
    this.schoolyearService.UpdateActifAnneeScolaire(Id).subscribe({
      next: (data: SchoolYear[]) => { this.onSetActifComplete(), this.rowData= data },
      error: err => this.errorMessage = err
    })
  }

  deleteItem(id: number) {
    this.notification.deleteElementAlert().then((result) => {
      if (result.value) {
        this.schoolyearService.deleteSchoolYear(id)
          .subscribe({
            next: ()=> this.notification.onSaveComplete('warning',"Année scolaire","supprimée",this.refreshSchoolYearList()),
            error: err => this.errorMessage = err
          });
      }else{
        this.refreshSchoolYearList()
      }
    })

  }
   saveSchoolYear() {
    if (this.schoolYearForm.valid) {
      if (this.schoolYearForm.dirty) {
        const year = { ...this.schoolYear, ...this.schoolYearForm.value };      
        if (year.Id === 0) {
          this.schoolyearService.createSchoolYear(year).subscribe({
           next: () => this.notification.onSaveComplete('success',"Année scolaire","ajoutée",this.refreshSchoolYearList()),
            error: err => this.errorMessage = err
          });                 
        } else {
          this.schoolyearService.updateSchoolYear(year)
            .subscribe({
               next: () => this.notification.onSaveComplete('success',"Année scolaire","modifiée",this.refreshSchoolYearList()),            
              error: err => this.errorMessage = err
            });
        }
      } else {
               
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
