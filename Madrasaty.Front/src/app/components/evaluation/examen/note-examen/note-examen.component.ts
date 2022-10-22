import { NotificationService } from 'src/app/services/notification/notification.service';
import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Examen } from 'src/app/models/examen';
import { Examennotes } from 'src/app/models/examennotes';
import { ExamensService } from 'src/app/services/Examens/examens.service';

@Component({
  selector: 'app-note-examen',
  templateUrl: './note-examen.component.html',
  styleUrls: ['./note-examen.component.scss']
})
export class NoteExamenComponent implements OnInit {
  private sub: Subscription;
  errorMessage = '';
  examenNotesList:Examennotes[]=[];
  examen :Examen;
  id

  rateInput = 0 ;
  @ViewChild("note") note2: ElementRef;
  @ViewChild("input_error") input_error: ElementRef;
  constructor(private route: ActivatedRoute,private notification:NotificationService,private examenService : ExamensService) {     

  
}
  ngOnInit() {
   this.sub=this.route.paramMap.subscribe(
      params => {
         this.id = params.get('Id');     
       this.getExamen(this.id);
      }
    ); 

  }


   ngOnDestroy(): void {
    this.sub.unsubscribe();
  } 
  getExamen(id: number): void {
    console.log(id);
    this.examenService.getExamenById(id)
    .subscribe({
      next: examen => {
        this.examen = examen;
        this.getExamenNotes(examen);
      },
      error: err => this.errorMessage = err
    });


  }
  getExamenNotes(examen : Examen){
    this.examenService.getNotesExamen(examen)
    .subscribe({
      next: examensList => {
        this.examenNotesList = examensList;
      },
      error: err => this.errorMessage = err
    });
  }
  setNote(note) {
    var model = {
        ExamenId: note.ExamenId,
        StudentId: note.StudentId.toString(),
        Note: note.Note,
        Observation: note.Observation
    }
    this.examenService.updateNoteExamen(note)
    .subscribe({
      next: () => this.notification.onSaveComplete('success',"Note","ajoutée", this.getExamen(note.ExamenId)),
      error: err => this.errorMessage = err
    });
  }

  enforceMinMax(){
    console.log(this.input_error.nativeElement.innerHTML ) 
    var el =this.note2.nativeElement
    if(el.value != ""){
      if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
      }
      if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
   
      }
 
    }
  }

}
