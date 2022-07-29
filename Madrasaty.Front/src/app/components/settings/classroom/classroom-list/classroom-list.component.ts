import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Classroom } from 'src/app/models/classroom';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {
  errorMessage = '';
  rowData
  switchbtn: boolean = false;
  rowId: number = -1;
  gridOptions: GridOptions;
  search:string;
  columnDefs
  localeText;
  classroomForm: FormGroup;
  private genericValidator: GenericValidator;
  classroom: Classroom;
  editType: string;
  domLayout: string;
  DialogTitle: string;
  paginationPageSize: number;
  dataSource:any;
  private validationMessages: { [key: string]: { [key: string]: string } };
  displayedColumns: string[] = ['name', 'NumberProjector', 'NumberDesk', 'NumberChair' ,'Actions'];
  
@ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  constructor(private classroomService: ClassroomService, private router: Router ,private dialog: MatDialog , private formBuilder: FormBuilder) { 
    this.dataSource = new MatTableDataSource<any>(this.rowData);
    

    this.validationMessages = {
      Wording: {
        required: 'Ce champ est obligatoire.'
      },
      NumberProjector: {
        required: 'Ce champ est obligatoire.',
        min: 'La valeur de ce champ doit être un nombre positif'
      },
      NumberDesk: {
        required: 'Ce champ est obligatoire.',
        min: 'La valeur de ce champ doit être un nombre positif'
      },
      NumberChair: {
        required: 'Ce champ est obligatoire.',
        min: 'La valeur de ce champ doit être un nombre positif'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.classroomForm = this.formBuilder.group({
      Wording: ['', Validators.required],
      NumberProjector: [0, [Validators.required]],
      NumberDesk: [0, [Validators.required]],
      NumberChair: [0, [Validators.required]],
    });
  }

  ngOnInit() {
   
    this.classroomService.getClassrooms().subscribe({
      next: classrooms => {
        this.rowData = classrooms;
        console.log(this.rowData);
        this.dataSource = new MatTableDataSource<any>(this.rowData);
      },
      error: err => this.errorMessage = err
    });
  }

  deleteItem(id: number) {

    this.deleteElementAlert().then((result) => {
      if (result.value) {
        this.classroomService.deleteClassroom(id)
          .subscribe({
            next: () => {
              this.refreshClassroomList()
              swal({
                position: 'top',
                title: "Classe supprimer avec succès",
                type: 'warning',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
              });
            },
            error: err => this.errorMessage = err
          });
  
      }
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

  refreshClassroomList() {
    this.classroomService.getClassrooms().subscribe({
      next: classrooms => {
        this.rowData = classrooms;
      },
      error: err => this.errorMessage = err
    });
  }
  switchToCard(){
    this.switchbtn = !(this.switchbtn);
  }

  saveClassroom(): void {
    if (this.classroomForm.valid) {
      if (this.classroomForm.dirty) {
        const disp = { ...this.classroom, ...this.classroomForm.value };

        if (disp.Id === 0) {
          this.classroomService.createClassroom(disp)
            .subscribe({
              next: () => {this.onSaveComplete("ajoutée"),    this.classroomForm.reset(), this.refreshClassroomList();},
              error: err => this.errorMessage = err
            });

        } else {
          this.classroomService.updateClassroom(disp)
            .subscribe({
              next: () => {this.onSaveComplete("modifiée"),this.refreshClassroomList()},
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete("");
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  
  onSaveComplete(msg: string): void {
    this.classroomForm.reset();
      this.dialog.closeAll();
    if (msg != "") {
      
      swal({
        position: 'top',
        title: "Classe " + msg + " avec succès",
        type: 'success',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
    }
  
    this.refreshClassroomList()
  }
  displayClassroom(classroom: Classroom): void {
    if (this.classroomForm) {
      this.classroomForm.reset();
    }
    this.classroom = classroom;

    this.classroomForm.patchValue({
      Wording: this.classroom.Wording,
      NumberProjector: this.classroom.NumberProjector,
      NumberDesk: this.classroom.NumberDesk,
      NumberChair: this.classroom.NumberChair

    });
  }
  OpenDiag(id: number) {
    //this.schoolYearForm.reset();
    let dialogRef = this.dialog.open(this.callAPIDialog);
    this.DialogTitle = id == -1 ? "Ajouter une sale" : "Modifier une sale"
    this.classroomService.getClassroom(id)
      .subscribe({
        next: (classroom: Classroom) => this.displayClassroom(classroom),
        error: err => console.log(err)
      });
    }
  
  
}
