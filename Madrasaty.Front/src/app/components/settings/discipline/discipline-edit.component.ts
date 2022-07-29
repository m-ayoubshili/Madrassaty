import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Discipline } from 'app/models/discipline';
import { Router } from '@angular/router';
//import {DisciplineListComponent} from './discipline-list.component';
import { DisciplineListComponent } from './discipline-list.component';
import { DisciplineService } from 'app/services/discipline/discipline.service';
import { GenericValidator } from 'app/shared/generic-validator';
import { merge, fromEvent, Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-discipline-edit',
  templateUrl: './discipline-edit.component.html',
  styles: []
})
export class DisciplineEditComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  modalTitle: string;
  dd:DisciplineListComponent;
  disciplineForm: FormGroup;
  discipline: Discipline;
  currentId: number;
  rowData
  errorMessage: string;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  currentDisciplineId: any;

  constructor(public bsModalRef: BsModalRef,private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private disciplineService: DisciplineService) {

    this.validationMessages = {
      Wording: {
        required: 'Le nom est obligatoire.'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit() {
    this.disciplineForm = this.formBuilder.group({
      Wording: ['', Validators.required],
      Description: ''
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.disciplineForm.valueChanges, ...controlBlurs).pipe(
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.disciplineForm);
    });
    this.getDiscipline();
  }

  getDiscipline(): void {
    this.disciplineService.disciplineIdData.subscribe(data => {
      this.currentDisciplineId = data;
      this.disciplineService.getDiscipline(this.currentDisciplineId)
        .subscribe({
          next: (discipline: Discipline) => this.displayDiscipline(discipline),
          error: err => console.log(err)
        });
    })

  }

  displayDiscipline(discipline: Discipline): void {
    if (this.disciplineForm) {
      this.disciplineForm.reset();
    }
    this.discipline = discipline;

    this.disciplineForm.patchValue({
      Wording: this.discipline.Wording,
      Description: this.discipline.Description,

    });
  }
  //Method to refresh the list of Disciplines
  refreshDisciplineList() {
    this.disciplineService.getDisciplines().subscribe({
      next: disciplines => {
        this.rowData = disciplines;
      },
      error: err => this.errorMessage = err
    });
  }

  saveDiscipline(): void {
    if (this.disciplineForm.valid) {
      if (this.disciplineForm.dirty) {
        const disp = { ...this.discipline, ...this.disciplineForm.value };

        if (disp.Id === 0) {
          this.disciplineService.createDiscipline(disp)
            .subscribe({
              next: () => {
                this.onSaveComplete("ajouté"),
                //location.reload();
                this.reloadComponent();
               
         
              },
            
              error: err => this.errorMessage = err
            });
        } else {
          this.disciplineService.updateDiscipline(disp)
            .subscribe({
              next: () => {this.onSaveComplete("modifié"),
             // location.reload();
             this.reloadComponent();
            },
             
              error: err => this.errorMessage = err
            });
            this.disciplineService.getDiscipline(disp.Id).subscribe({
              next: disciplines => {
                this.rowData = disciplines;
              },
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
    // Reset the form 
    this.disciplineForm.reset();
    this.bsModalRef.hide();
    if (msg != "") {
      Swal({
        position: 'top',
        type: "success",
        title: 'Discipline ' + msg + ' avec succès',
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
  }

  //to reload component 
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
