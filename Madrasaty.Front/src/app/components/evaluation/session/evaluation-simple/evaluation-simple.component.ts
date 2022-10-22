import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { Discipline } from 'src/app/models/discipline';
import { DisciplineLevel } from 'src/app/models/DisciplineLevel';
import { Member } from 'src/app/models/member';
import { RecitationDetail } from 'src/app/models/recitation-detail';
import { RecitationSessionModel } from 'src/app/models/recitation-session-model';
import { EvaluationSimpleService } from 'src/app/services/evaluation-simple/evaluation-simple.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { RecitationDetailService } from 'src/app/services/recitation-detail/recitation-detail.service';
import { SessionService } from 'src/app/services/session/session.service';
import { StudentDisciplineLevelService } from 'src/app/services/student-discipline-level/student-discipline-level.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import swal from 'sweetalert2';


@Component({
  selector: 'app-evaluation-simple',
  templateUrl: './evaluation-simple.component.html',
  styleUrls: ['./evaluation-simple.component.scss']
})
export class EvaluationSimpleComponent implements OnInit {

 /*  overStar: number | undefined;
  profile: Member;
  mark: string;
  percent: number;
  max = 5;
  rate = 0;
  PhotoPath: any;
  currentSessionId: string;
  currentStudentId: string;
  Rating
  poemeList: any;
  FullName: string;
  currentSurah: any;
  Discipline: Discipline;
  Level: DisciplineLevel;
  Session: RecitationSessionModel;
  currentRecitationDetail: RecitationDetail;
  evaluationSimpleForm: FormGroup;
  displayMessage: { [key: string]: string } = {};
  rating;
  starCount:number = 5;



  constructor(
    private memberService: MembersListService, 
    private route: ActivatedRoute, 
    private studentDisciplineLevelService: StudentDisciplineLevelService, 
    private recitationDetailService: RecitationDetailService, 
    private recitationSessionService: SessionService, 
    private formBuilder: FormBuilder, 
    private evaluationSimpleService: EvaluationSimpleService,
    private datePipe: DatePipe,
  ) { }

  onRatingChanged(rating){
    this.rating = rating;    
  }
  ngOnInit() {
    this.getParamsFromURL()
    this.recitationSessionService.getSession(this.currentSessionId).subscribe((data) => {
      this.getStudentDisciplineLevel(this.currentStudentId, data.DisciplineId);
    })

    this.evaluationSimpleForm = this.formBuilder.group({
      Poeme: ['',Validators.required],
      Debut: [1,[Validators.required,Validators.min(0)]],
      Fin: [1,[Validators.required,Validators.min(0)]],
      Remarques:[''],
      Rating:''   });

  
    this.evaluationSimpleService.getPoeme().subscribe(
      (poeme)=>this.poemeList=poeme,
      (error)=>console.log(error)
    );
    this.memberService.getMember(this.currentStudentId)
      .subscribe({
        next: (member: Member) => {
          this.PhotoPath = this.memberService.GetMemberPhotoPath(member.PhotoPath),
            this.FullName = member.FirstName + ' ' + member.LastName
            console.log(  this.PhotoPath + this.FullName )
        },
        error: err => console.log(err)
      });

       this.evaluationSimpleForm.valueChanges.subscribe(val => {
        if (val.Poeme != "") {
          if (val.Debut > 0 || val.fin > 0) {
              [...Array.from({ length: (this.fin.value + 1 - this.debut.value) }, (v, k) => k + this.debut.value)].forEach(element => {
              });
            this.currentRecitationDetail.Surah = this.poeme.value
            this.currentRecitationDetail.VerseDebut = this.debut.value
            this.currentRecitationDetail.VerseFin = this.fin.value
            this.currentRecitationDetail.Remarques = this.remarques.value
            this.currentRecitationDetail.Rating = this.Rating.value
            this.recitationDetailService.updateRecitation(this.currentRecitationDetail).subscribe({
              next: response => this.onUpdateComplete("done"),
              error: err => console.log("error")
            })    
          }
        }     
      });  
      
    }
    resetStar(): void {
      this.overStar = void 0;
    }




    ngAfterViewInit(): void {
      // CREATE RECITATION_DETAIL IF NOT EXISTS
  this.InitRecitationDetail(this.currentStudentId,parseInt(this.currentSessionId))
    } 


    InitRecitationDetail(currentStudentId: string, currentSessionId: number) {
      let recitationDetailModel: RecitationDetail = {
        Id: 0,
        RecitationId: currentSessionId,
        RecitationSession: null,
        StudentId: currentStudentId,
        Student: null,
        Surah: 1,
        VerseDebut: 1,
        VerseFin: 1,
        Rating: 1,
        Remarques: '',
        DateEvaluation: new Date(this.datePipe.transform(new Date(), 'MM/dd/yyyy')),
  
      };
     this.displayRecitationDetail(recitationDetailModel)
       this.recitationDetailService.createRecitationDetail(recitationDetailModel).subscribe({
        next: (response: RecitationDetail) => this.displayRecitationDetail(response),
        error: err => console.log(err),
       
      });  

      
    }
    displayRecitationDetail(recitationDetail: RecitationDetail) {

      if (this.evaluationSimpleForm) {
        this.evaluationSimpleForm.reset();
      }
      this.currentRecitationDetail = recitationDetail;
  
      this.evaluationSimpleForm.patchValue({
        Poeme: this.currentRecitationDetail.Surah,
        Debut: this.currentRecitationDetail.VerseDebut,
        Fin: this.currentRecitationDetail.VerseFin,
        Remarques: this.currentRecitationDetail.Remarques,
        Rating: this.currentRecitationDetail.Rating
  
      });
 
    }
    get poeme() {
      return this.evaluationSimpleForm.get('Poeme');
    }
    get debut() {
      return this.evaluationSimpleForm.get('Debut');
    }
    get fin() {
      return this.evaluationSimpleForm.get('Fin');
    }
    get remarques() {
      return this.evaluationSimpleForm.get('Remarques');
    }
     get rating1() {
      return this.evaluationSimpleForm.get('Rating') ;
    }  


    getStudentDisciplineLevel(studentId: string, discplineId: number) {
      this.studentDisciplineLevelService.getStudentDisciplineLevel(studentId, discplineId).subscribe((data) => {
        this.Discipline = data.Discipline,
          this.Level = data.Discipline["DisciplineLevels"].filter((el) => el.Id == data.DisciplineLevelId)[0]
      })
    }
    getRecitationSession(sessionId: number) {
      this.recitationSessionService.getSession(sessionId).subscribe((data) => {
        this.Session = data
      })
    }
    onUpdateComplete(msg: string) {
      if (msg == "done") {
        swal({
          position: 'top',
          type: "success",
          title: "L'évaluation est mis à jour",
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }
      else {
        swal({
          position: 'top',
          type: "error",
          title: "Un problème est survenu lors de la mise à jour de l'évaluation",
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }
    }

    confirmSelection() { 
    
      /* this.recitationDetailService.updateRecitation(this.evaluationSimpleForm.value).subscribe(
        {
          next: response => this.onUpdateComplete("done"),
          error: err => console.log("error")
        }); 

        this.currentRecitationDetail.Rating = this.overStar;
        this.recitationDetailService.updateRecitation(this.currentRecitationDetail).subscribe(
          {
            next: response => this.onUpdateComplete("done"),
            error: err => console.log("error")
          });

  
    }


    getParamsFromURL() {
      const param1 = this.route.snapshot.paramMap.get('SessionId');
      const param2 = this.route.snapshot.paramMap.get('Id'); 
        this.currentSessionId = param1;
        this.currentStudentId = param2;
        console.log(  this.currentSessionId + this.currentStudentId)
    
    }
 */


    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    overStar: number | undefined;
    profile: Member;
    mark: string;
    percent: number;
    max = 5;
    rate = 0;
    PhotoPath: any;
    currentSessionId: string;
    currentStudentId: string;
    Debut;
    Fin;
    Poeme;
    Remarques;
    Rating;
    poemeList: any;
    FullName: string;
    currentSurah: any;
    Discipline: Discipline;
    Level: DisciplineLevel;
    Session: RecitationSessionModel;
    currentRecitationDetail: RecitationDetail;
    evaluationSimpleForm: FormGroup;
    displayMessage: { [key: string]: string } = {};
    private genericValidator: GenericValidator;
    private validationMessages: { [key: string]: { [key: string]: string } };
    constructor(
      private memberService: MembersListService, 
      private route: ActivatedRoute, 
      private studentDisciplineLevelService: StudentDisciplineLevelService, 
      private recitationDetailService: RecitationDetailService, 
      private recitationSessionService: SessionService, 
      private formBuilder: FormBuilder, 
      private evaluationSimpleService: EvaluationSimpleService,
      private datePipe: DatePipe,
      ) {
  
      this.validationMessages = {
        Poeme: {
          required: 'Ce champ est obligatoire.'
        },
        Debut: {
          required: 'Ce champ est obligatoire.',
          min: 'Le nombre de versé doit être supérieur à zéro'
        },
        Fin: {
          required: 'Ce champ est obligatoire.',
          min: 'Le nombre de versé doit être supérieur à zéro'
        }
      };
      this.genericValidator = new GenericValidator(this.validationMessages);
      this.getSessionIdFromURL();
      this.getStudentIdFromURL();
      this.recitationSessionService.getSession(this.currentSessionId).subscribe((data) => {
        this.getStudentDisciplineLevel(this.currentStudentId, data.DisciplineId);
      })
     }
  
    ngOnInit() {
      this.evaluationSimpleForm = this.formBuilder.group({
        Poeme: ['', Validators.required],
        Debut: [1, Validators.min(1)],
        Fin: [1, Validators.min(1)],
        Remarques:[''],
        Rating:[0, Validators.required]
      });
      this.evaluationSimpleService.getPoeme().subscribe(
        (poeme)=>this.poemeList=poeme,
        (error)=>console.log(error)
      );
      this.memberService.getMember(this.currentStudentId)
        .subscribe({
          next: (member: Member) => {
            this.PhotoPath = this.memberService.GetMemberPhotoPath(member.PhotoPath),
              this.FullName = member.FirstName + ' ' + member.LastName
          },
          error: err => console.log(err)
        });
        this.initRecitationDetail(this.currentStudentId, parseInt(this.currentSessionId));
    
      }
    ngAfterViewInit(): void {
      
      this.initRecitationDetail(this.currentStudentId, parseInt(this.currentSessionId));
    
    }
  
    initRecitationDetail(currentStudentId: string, currentSessionId: number) {
      let recitationDetailModel: RecitationDetail = {
        Id: 0,
        RecitationId: currentSessionId,
        RecitationSession: null,
        StudentId: currentStudentId,
        Student: null,
        Surah: 1,
        VerseDebut: 1,
        VerseFin: 1,
        Rating: 0,
        Remarques: '',
        DateEvaluation: new Date(this.datePipe.transform(new Date(), 'MM/dd/yyyy')),
  
      };
      this.recitationDetailService.createRecitationDetail(recitationDetailModel).subscribe({
        next: response => {
          this.currentRecitationDetail = response
          this.evaluationSimpleForm.patchValue({
            Poeme: response.Surah,
            Debut: response.VerseDebut,
            Fin: response.VerseFin,
            Remarques: response.Remarques,
            Rating: response.Rating
          });
          this.rate = response.Rating;
        },
        error: err => console.log("error")
      })
      
    }
    displayRecitationDetail(recitationDetail: RecitationDetail) {
  
      if (this.evaluationSimpleForm) {
        this.evaluationSimpleForm.reset();
      }
      this.currentRecitationDetail = recitationDetail;
  
      this.evaluationSimpleForm.patchValue({
        Poeme: this.currentRecitationDetail.Surah,
        Debut: this.currentRecitationDetail.VerseDebut,
        Fin: this.currentRecitationDetail.VerseFin,
        Remarques: this.currentRecitationDetail.Remarques,
        Rating: this.currentRecitationDetail.Rating
  
      });
  console.log(this.currentRecitationDetail.Rating);
    }
    get poeme() {
      return this.evaluationSimpleForm.get('Poeme');
    }
    get debut() {
      return this.evaluationSimpleForm.get('Debut');
    }
    get fin() {
      return this.evaluationSimpleForm.get('Fin');
    }
    get remarques() {
      return this.evaluationSimpleForm.get('Remarques');
    }
    get rating() {
      return this.evaluationSimpleForm.get('Rating');
    }
  
    
    
  
    getSessionIdFromURL() {
      const param = this.route.snapshot.paramMap.get('SessionId');
      if (param) {
        this.currentSessionId = param;
      }
    }
    getStudentIdFromURL() {
      const param = this.route.snapshot.paramMap.get('Id');
      if (param) {
        this.currentStudentId = param;
  
      }
    }
    getStudentDisciplineLevel(studentId: string, discplineId: number) {
      this.studentDisciplineLevelService.getStudentDisciplineLevel(studentId, discplineId).subscribe((data) => {
        this.Discipline = data.Discipline,
          this.Level = data.Discipline["DisciplineLevels"].filter((el) => el.Id == data.DisciplineLevelId)[0]
      })
    }
  
    getRecitationSession(sessionId: number) {
      this.recitationSessionService.getSession(sessionId).subscribe((data) => {
        this.Session = data
      })
    }
  
    onUpdateComplete(msg: string) {
      if (msg == "done") {
        swal({
          position: 'top',
          type: "success",
          title: "L'évaluation est mis à jour",
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }
      else {
        swal({
          position: 'top',
          type: "error",
          title: "Un problème est survenu lors de la mise à jour de l'évaluation",
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }
    }
  
    hoveringOver(value: number): void {
      this.overStar = value;
      this.percent = (value / this.max) * 100;
      if (this.percent <= 20) {
        this.mark = 'Innacceptable'
      }
      else if (this.percent <= 40) {
        this.mark = 'Faible'
      }
      else if (this.percent <= 60) {
        this.mark = 'Moyen'
      }
      else if (this.percent > 60 && this.percent <= 80) {
        this.mark = 'Bien'
      }
      else {
        this.mark = 'Très  Bien'
      }
    }
  
    resetStar(): void {
      this.overStar = void 0;
    }
    confirmSelection() {

/* 
      this.evaluationSimpleForm.valueChanges.subscribe(val => {
        if (val.Poeme != "") {
          if (val.Debut > 0 || val.fin > 0) {
              [...Array.from({ length: (this.fin.value + 1 - this.debut.value) }, (v, k) => k + this.debut.value)].forEach(element => {
              });
            this.currentRecitationDetail.Surah = this.poeme.value
            this.currentRecitationDetail.VerseDebut = this.debut.value
            this.currentRecitationDetail.VerseFin = this.fin.value
            this.currentRecitationDetail.Remarques = this.remarques.value
            this.currentRecitationDetail.Rating = this.rating.value
            this.recitationDetailService.updateRecitation(this.currentRecitationDetail).subscribe({
              next: response => this.onUpdateComplete("done"),
              error: err => console.log("error")
            })    
          }
        }     
      }); */
      //console.log($event)
      //console.log(this.overStar)
      console.log(this.evaluationSimpleForm.value)
      this.currentRecitationDetail.Rating = this.overStar;
      this.recitationDetailService.updateRecitation(this.evaluationSimpleForm.value).subscribe(
        {
          next: response => this.onUpdateComplete("done"),
          error: err => console.log("error")
        });
  
    }

}
