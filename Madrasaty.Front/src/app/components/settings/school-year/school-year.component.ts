import { DatePipe } from '@angular/common';
import { Component,  ElementRef,  OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import 'rxjs/add/operator/map';

import { SchoolYear } from 'src/app/models/schoolyear';
import { SchoolyearService } from 'src/app/services/schoolyear/schoolyear.service';
import { GridOptions } from 'ag-grid-community';
import swal from 'sweetalert2';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { MatDialog } from '@angular/material/dialog';
declare let $: any;
@Component({
  selector: 'app-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.scss']
})
export class SchoolYearComponent implements OnInit {
  schoolYears: SchoolYear[];
  errorMessage: string;
 
  status: false;
  rowId: number = -1;
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
  switchbtn: boolean;
  search:string;
  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };
  schoolYearForm: FormGroup;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  constructor(private formBuilder: FormBuilder,private datePipe:DatePipe ,private schoolyearService: SchoolyearService,private dialog: MatDialog) { 
    this.dataGridInit();

    this.validationMessages = {
      Name: { required: 'Le nom est obligatoire et doit être unique.' },
      DateD: { required: 'date debut est obligatoire' },
      Datef: { required: 'date fin est obligatoire.' },
    
    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.schoolYearForm = this.formBuilder.group({
      Name: ["", Validators.required],
      DateD: ["", Validators.required],
      Datef: ["", Validators.required],

    });


  }
  OpenDiag() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
  

}

  ngOnInit() {
    this.switchbtn = false;
    this.displaySchools();

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
        {
          headerName: 'EndDay', field: 'EndDay', sortable: true, filter: true, resizable: true, cellRenderer: (data) => {
            return data.value ? this.datePipe.transform(data.value, 'dd/MM/yyyy'): '';

          }
        },
      
      ];
  }

  displaySchools() {
    this.schoolyearService.getSchoolYears().map(item => {
      return item.map(s => {
        s.StartDay = new Date(s.StartDay + "Z")
        s.EndDay = new Date(s.EndDay + "Z")
        return s
      })
    })
      .subscribe(
        {
          next: schoolYearList => {
            this.rowData= schoolYearList;
          },
          error: err => this.errorMessage = err
        });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

  }
  switchToCard() {
    this.switchbtn = !(this.switchbtn);
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
          next: schoolYearList => {
            this.rowData= schoolYearList
                    },
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
  deleteElementAlert() {
    return swal({
      title: 'Etes-vous sûr de vouloir supprimer cet élément?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer',
      type: 'warning',
      cancelButtonText: 'Annuler',

    })
  }
  deleteItem(id: number) {

    this.deleteElementAlert().then((result) => {
      if (result.value) {
        this.schoolyearService.deleteSchoolYear(id)
          .subscribe({
            next: () => this.refreshSchoolYearList(),
            error: err => this.errorMessage = err
          });
      }
    })

  }
  editSchoolYear(id: number) {
    this.rowId = id;
  }
  openModal(id: number, fromGrid: false) {
    if (fromGrid) { $("#myModal").modal("show"); }
    this.rowId = id;
  }
}
