import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';

import { Discipline } from 'src/app/models/discipline';
import { DisciplineService } from 'src/app/services/discipline/discipline.service';
import { NotificationService } from 'src/app/services/notification/notification.service';



@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {
  disciplines: Discipline[] = [];
  switchbtn: boolean = false;
 
  errorMessage = '';
  rowData
  search
  DialogTitle: string;
  DisciplineForm: FormGroup;
  discipline: Discipline;
  constructor(private notification: NotificationService,private formBuilder: FormBuilder, private disciplineService: DisciplineService ) { 

    
  }

  
  ngOnInit(): void { 
    this.refreshDisciplineList()
    this.DisciplineForm = this.formBuilder.group({
      Wording: ["", Validators.required],
      Description: ["", Validators.required]
    });
  }

  OpenDiag(id: number) {  
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

  searchResult(data){
    this.search=data
    console.log(data)
  }
  refreshDisciplineList() {
    this.disciplineService.getDisciplines().subscribe({
      next: disciplines => {
        this.rowData = disciplines;
      },
      error: err => this.errorMessage = err
    });
  }

  saveDiscipline(): void {
    if (this.DisciplineForm.valid) {
      if (this.DisciplineForm.dirty) {
      const sc = { ...this.discipline, ...this.DisciplineForm.value ,DisciplineLevels:null};                
        if (sc.Id===0) {
        this.disciplineService.createDiscipline(sc)        
          .subscribe({
            next: () => this.notification.onSaveComplete('success',"Discipline ","ajoutée",this.refreshDisciplineList()),        
            error: err => alert('Oops... un probleme lors de la creation de disciplines')
          });        
      } 
    else {
        this.disciplineService.updateDiscipline(sc)
        .subscribe({
          next: () => this.notification.onSaveComplete('success',"Discipline ","modifiée",this.refreshDisciplineList()),
          error: err => alert('Oops... Le nom de votre discipline est déjà pris, merci de renseigner un autre nom.')
        });        
      }     
    }
  } else {
      this.errorMessage = 'Veuillez saisir correctement les champs demandés.';
    }
  }
  deleteItem(id: number) {
    this.notification.deleteElementAlert().then((result) => {
      if (result.value && id!=0) {
        this.disciplineService.deleteDiscipline(id)
          .subscribe({
            next: () => this.notification.onSaveComplete('warning',"Discipline","supprimée",this.refreshDisciplineList()),
            error: err => this.errorMessage = err
          });
      }
      else
      {
        this.refreshDisciplineList()
      }
    })
  }

}
