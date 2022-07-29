import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Discipline } from 'src/app/models/discipline';
import { DisciplineService } from 'src/app/services/discipline/discipline.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import swal from 'sweetalert2';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {
  disciplines: Discipline[] = [];
  switchbtn;
 
  errorMessage = '';
  rowData
  DialogTitle: string;
  DisciplineForm: FormGroup;
  discipline: Discipline;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  modalTitle: string;
  displayedColumns: string[] = ['name', 'Description','Actions'];
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  constructor(private formBuilder: FormBuilder, private disciplineService: DisciplineService,private dialog: MatDialog ) { 

    
  }

  OpenDiag(id: number) {
    //this.schoolYearForm.reset();
    let dialogRef = this.dialog.open(this.callAPIDialog);
    this.DialogTitle = id == -1 ? "Ajouter Discipline" : "Modifier Discipline"
    this.disciplineService.getDiscipline(id)
      .subscribe({
        next: (discipline: Discipline) => this.displayDiscipline(discipline),
        error: err => console.log(err)
      });
    }
    displayDiscipline(discipline: Discipline): void {
      if (this.DisciplineForm){
        this.DisciplineForm.reset();
      }
      this.discipline = discipline;
  
      this.DisciplineForm.patchValue({
        Wording: this.discipline.Wording,
        Description: this.discipline.Description,
        CreatedOn: this.discipline.CreatedOn
       
       
      });
  
    }

  ngOnInit(): void {
    this.switchbtn = false;
    this.disciplineService.getDisciplines().subscribe({
      next: disciplines => {
        this.rowData = disciplines;
      },
      error: err => this.errorMessage = err
    });
    this.DisciplineForm = this.formBuilder.group({
      Wording: ["", Validators.required],
      Description: ["", Validators.required]
      

    });
  }
  switchToCard(){
    this.switchbtn = !(this.switchbtn);
  }
  refreshDisciplineList() {
    this.disciplineService.getDisciplines().subscribe({
      next: disciplines => {
        this.rowData = disciplines;
      },
      error: err => this.errorMessage = err
    });
  }

  onSaveComplete(msg: string): void {
    if (msg != "") {
      swal({
        position: 'top',
        type: "success",
        title: 'Discipline ' + msg + ' avec succès',
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
    this.refreshDisciplineList();
  }
  saveDiscipline(): void {
    if (this.DisciplineForm.valid) {
      if (this.DisciplineForm.dirty) {
      const sc = { ...this.discipline, ...this.DisciplineForm.value ,DisciplineLevels:null};
                
        if (sc.Id===0) {
        this.disciplineService.createDiscipline( sc)
        
          .subscribe({
            next: () => {
            this.onSaveComplete("ajoutée"),
            this.refreshDisciplineList()},
           
            error: err => alert(
              'Oops... un probleme lors de la creation de disciplines')
          });
         
        
      } 
    else {
        this.disciplineService.updateDiscipline(sc)
        .subscribe({
          next: () => this.onSaveComplete("modifiée"),
          error: err =>   
          alert(
            'Oops... Le nom de votre discipline est déjà pris, merci de renseigner un autre nom.')
        });
        
      }
     
    }
  } else {
      this.errorMessage = 'Veuillez saisir correctement les champs demandés.';
    }
  }
  deleteItem(id: number) {

    this.deleteElementAlert().then((result) => {
      if (result.value && id!=0) {
        this.disciplineService.deleteDiscipline(id)
          .subscribe({
            next: () => {
              this.refreshDisciplineList(),
              swal({
                position: 'top',
                title: "Discipline supprimée avec succès",
                type: 'warning',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
              });
            },
            error: err => this.errorMessage = err
          });
      }
      else
      {
        this.refreshDisciplineList()
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


}
