import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { fromEvent, merge, Observable } from 'rxjs';
import { Discipline } from 'src/app/models/discipline';
import { DisciplineLevel } from 'src/app/models/DisciplineLevel';
import { Member } from 'src/app/models/member';
import { RecitationDetail } from 'src/app/models/recitation-detail';
import { RecitationSessionModel } from 'src/app/models/recitation-session-model';
import { Surah } from 'src/app/models/surah';
import { EvaluationDetailleeService } from 'src/app/services/evaluation-detaillee/evaluation-detaillee.service';
import { EvaluationsEtudiantService } from 'src/app/services/evaluations-etudiant/evaluations-etudiant.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { RecitationDetailService } from 'src/app/services/recitation-detail/recitation-detail.service';
import { SessionService } from 'src/app/services/session/session.service';
import { StudentDisciplineLevelService } from 'src/app/services/student-discipline-level/student-discipline-level.service';
import { TajwidErrorService } from 'src/app/services/tajwid-error/tajwid-error.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import swal from 'sweetalert2';
import { TajwidSubErrorsComponent } from './tajwid-sub-errors/tajwid-sub-errors.component';

@Component({
  selector: 'app-evaluation-detaillee',
  templateUrl: './evaluation-detaillee.component.html',
  styleUrls: ['./evaluation-detaillee.component.scss']
})
export class EvaluationDetailleeComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  bsModalRef: BsModalRef;
  PhotoPath: any;
  profile: Member;
  fautes = [];
  surahForm: FormGroup;
  currentSurah: any;
  surahList
  current: { 'number': number, 'numberAyahs': number };
  tajwidErrors: any;
  max = 5;
  rate = 0;
  overStar: number | undefined;
  mark: string;
  percent: number;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  currentSessionId: string;
  currentStudentId: string;
  FullName: string;
  Discipline: Discipline;
  Level: DisciplineLevel;
  Session: RecitationSessionModel;
  currentRecitationDetail: RecitationDetail;
  nbrSurah: number;
  maxnumaya: number;
  recitationDetailList: RecitationDetail[];
  tajwidErrorData;

p:number=1
  surahlist: any[] = []
  poemeList: { name: string, number: number }[]

  constructor(private memberService: MembersListService, private evaluationsEtudiantService: EvaluationsEtudiantService, private recitationDetailService: RecitationDetailService, 
    private recitationSessionService: SessionService, private route: ActivatedRoute,
     private tajwidErrorService: TajwidErrorService, private modalService: BsModalService, 
     private studentDisciplineLevelService: StudentDisciplineLevelService, private formBuilder: FormBuilder,
      private evaluationDetailleService: EvaluationDetailleeService, private datePipe: DatePipe,private modalService2: NgbModal) {
    this.validationMessages = {
      Surah: {
        required: 'Ce champ est obligatoire.'
      },
      AyahDebut: {
        required: 'Ce champ est obligatoire.',
        min: 'Le nombre de Ayah doit être supérieur à zéro',
        max: 'Le nombre de Ayah doit être inférieur à 286'
      },
      AyahFin: {
        required: 'Ce champ est obligatoire.',
        min: 'Le nombre de Ayah doit être supérieur à zéro',
        max: 'Le nombre de Ayah doit être inférieur à 286'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);

    this.getSessionIdFromURL();
    this.getStudentIdFromURL();

    this.recitationSessionService.getSession(this.currentSessionId).subscribe((data) => {
      this.getStudentDisciplineLevel(this.currentStudentId, data.DisciplineId);
    })
    this.surahForm = this.formBuilder.group({
      Surah: [1, Validators.required],
      AyahDebut: [1, Validators.min(1)],
      AyahFin: [1, [Validators.min(1), Validators.max(286)]]
    });
    this.initRecitationDetail(this.currentStudentId, parseInt(this.currentSessionId));



   }

  ngOnInit(){
    

    this.memberService.getMember(this.currentStudentId)
      .subscribe({
        next: (member: Member) => {
          this.PhotoPath = this.memberService.GetMemberPhotoPath(member.PhotoPath),
            this.FullName = member.FirstName + ' ' + member.LastName
        },
        error: err => console.log(err)
      });
  this.getSurahs();

    this.Onchanges();

    this.tajwidErrorService.getRootTajwidErrors().subscribe((data) => {
      this.tajwidErrors = data
    });
    this.tajwidErrorService.getTajwidErrors().subscribe(
      TajwidErrorData => {
      this.tajwidErrorData=TajwidErrorData,
      console.log(this.tajwidErrorData.find(x=>x.name='traits distinctifs des lettres').children);
      }
    );
  

  }
  getchild(name){
    this.tajwidErrorService.getTajwidErrors().subscribe(
      TajwidErrorData => {
      this.tajwidErrorData=TajwidErrorData,
      this.tajwidErrorData.find(x=>x.name=name).children;
      }
    );

  }
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.surahForm.valueChanges, ...controlBlurs).pipe(
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.surahForm);
    });
  }
  Onchanges() {
    this.surahForm.valueChanges.subscribe(val => {
      if (val.Surah != "") {

        let testmax = this.maxnumaya != undefined ? this.maxnumaya : 286
        if (val.AyahDebut > 0 && val.AyahFin > 0) {
          this.fautes = [],
            [...Array.from({ length: (this.ayahFin.value + 1 - this.ayahDebut.value) }, (v, k) => k + this.ayahDebut.value)].forEach(element => {
              let faute = {
                id: element,
                cssclass: "btn btn-primary dim",
                clicked: false
              }
              this.fautes.push(faute);
            });
          this.currentRecitationDetail.VerseDebut = this.ayahDebut.value
          this.currentRecitationDetail.VerseFin = this.ayahFin.value
          this.currentRecitationDetail.Surah = this.surah.value
          // this.recitationDetailService.updateRecitation(this.currentRecitationDetail).subscribe({
          //   next: response => this.onUpdateComplete("done"),
          //   error: err => console.log("error")
          // })
         /*  this.evaluationsEtudiantService.getSurahs().subscribe(surahs => {
            this.surahlist = surahs;
            this.getEvaluationsList();
          }); */
          this.evaluationDetailleService.getExistingLearningErrors(this.currentRecitationDetail.Id).subscribe((data) => {

            this.fautes.forEach(element => {
              let exists = this.checkErrorExistence(data, element.id)
              if (exists) {
                element.cssclass = "btn btn-warning dim",
                  element.clicked = true
              }
            });
          })

        }
      }
      else {
        this.fautes = []
      }

    });
  }
  initRecitationDetail(currentStudentId: string, currentSessionId: number) {
    let recitationDetailModel: RecitationDetail = {
      Id: 0,
      RecitationId: currentSessionId,
      RecitationSession: null,
      StudentId: currentStudentId,
      Student: null,
      Surah: 0,
      VerseDebut: 1,
      VerseFin: 1,
      Rating: 0,
      Remarques: '',
      DateEvaluation: new Date(this.datePipe.transform(new Date(), 'MM/dd/yyyy')),

    };
    let xxx = this.datePipe.transform(recitationDetailModel.DateEvaluation, 'MM/dd/yyyy')
    let modeltest: RecitationDetail = {
      RecitationId: Number(this.currentSessionId),
      StudentId: this.currentStudentId,
      DateEvaluation: recitationDetailModel.DateEvaluation,
      Id: 0,
      RecitationSession: null,
      Student: null,
      Surah: 0,
      VerseDebut: 0,
      VerseFin: 0,
      Rating: 0,
      Remarques: ''

    }
    this.recitationDetailService.abc(modeltest).subscribe((data) => {
      this.recitationDetailList = data
    })
    // this.recitationDetailService.createRecitationDetail(recitationDetailModel).subscribe({
    // next: response => {
    this.currentRecitationDetail = recitationDetailModel
    this.surahForm.patchValue({
      Surah: recitationDetailModel.Surah,
      AyahDebut: recitationDetailModel.VerseDebut,
      AyahFin: recitationDetailModel.VerseFin

    });
    if (this.surah.value != 0) {
      this.evaluationDetailleService.getSurahById(recitationDetailModel.Surah).subscribe((ddata) => {
        this.maxnumaya = ddata
      })
    }
    this.evaluationDetailleService.getExistingLearningErrors(recitationDetailModel.Id).subscribe((data) => {

      this.fautes.forEach(element => {
        let exists = this.checkErrorExistence(data, element.id)
        if (exists) {
          element.cssclass = "btn btn-warning dim",
            element.clicked = true
        }
      });
    })
    this.rate = recitationDetailModel.Rating;


  }
  checkErrorExistence(data: any[], idd: number): boolean {
    return data.find(r => parseInt(r.Wording) == idd && this.currentRecitationDetail.Id == data[0].RecitationDetailId);
  }
  displayRecitationDetail(recitationDetail: RecitationDetail) {

    if (this.surahForm) {
      this.surahForm.reset();
    }
    this.currentRecitationDetail = recitationDetail;

    this.surahForm.patchValue({
      Surah: this.currentRecitationDetail.Surah,
      AyahDebut: this.currentRecitationDetail.VerseDebut,
      AyahFin: this.currentRecitationDetail.VerseFin

    });

  }
  getSurahs(): void {

/*     this.evaluationDetailleService.getSurah()
      .subscribe({
        next: (surah) => {
          this.surahList = surah
          console.log(surah.)
        },
        error: err => console.log(err)
      });  */
   
     this.evaluationDetailleService.getSurah().subscribe((data)=>{
        console.log(data)
        this.surahList = data["data"]
      })
 
  }
  refreshAyahs() {
    if (this.surah.value != "" && this.surah.value != 0) {
      this.evaluationDetailleService.getSurahById(this.surah.value).subscribe((numnberofayahs) => {
        this.surahForm.patchValue({
          AyahDebut: 1,
          AyahFin: numnberofayahs

        });
      })

    }
  }
  displaySurah(surah): void {
    if (this.surahForm) {
      this.surahForm.reset();
    }
    this.currentSurah = surah;
    this.surahForm.patchValue({

      Surah: this.currentSurah.number,
      AyahDebut: 1,
      AyahFin: this.currentSurah.numberOfAyahs

    });
  }
  get surah() {
    return this.surahForm.get('Surah');
  }
  get ayahDebut() {
    return this.surahForm.get('AyahDebut');
  }
  get ayahFin() {
    return this.surahForm.get('AyahFin');
  }
  pushItem($event) {
    console.log(  this.fautes)
    const maxVal = Math.max(...this.fautes.map(o => o.id)) + 1
    if (maxVal <= this.maxnumaya) {
      let newItem = {
        id: maxVal,
        cssclass: "btn btn-primary dim",
        clicked: false

      }
      this.fautes.push(newItem)
      this.surahForm.patchValue({

        AyahFin: maxVal
      })
    
    }

  }
  onButtonClick(btnClicked) {

    let itemToEdit = this.fautes.find(item => item.id == btnClicked.id);
    if (itemToEdit.Wording != "-Infinity") {
      if (itemToEdit.clicked) {
        itemToEdit.cssclass = "btn btn-primary dim"
        itemToEdit.clicked = !itemToEdit.clicked
 
      }
      else {
        itemToEdit.cssclass = "btn btn-warning dim"
        itemToEdit.clicked = !itemToEdit.clicked
        let model = {
          Id: 0,
          RecitationDetailId: this.currentRecitationDetail.Id,
          Wording: itemToEdit.id
        }

      }

      this.fautes.map((item, i) => {
        if (item.id == itemToEdit.id) {
          this.fautes[i] = itemToEdit;
        }
      });
    }
  }
  clickbut(item) {
    console.log(item.children)
    this.evaluationDetailleService.changeItem(item)
    
    this.evaluationDetailleService.changeRecitationDetail(this.currentRecitationDetail.Id)


    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true
    };

    this.bsModalRef = this.modalService.show(TajwidSubErrorsComponent,config);
     this.bsModalRef.content.modalTitle = item.name;
     this.bsModalRef.content.subErrorsList=item.children;
    /* this.modalService.onHide.pipe(take(1), filter(reason => reason === 'Yes')).subscribe(() => {
      let tajwiderrorlist: Array<any> = [];
      this.bsModalRef.content.finalSubErrorsList.forEach(element => {
        let tajwidError = {
          Id: 0,
          RecitationDetailId: this.currentRecitationDetail.Id,
          TajwidErrorId: element.name
        }
        tajwiderrorlist.push(tajwidError)
      });
      this.evaluationDetailleService.createRecitationTajwidErrors(tajwiderrorlist).subscribe(
        {
          next: response => this.onUpdateComplete("done"),
          error: err => this.onUpdateComplete("error")
        });
    }); */

  }
  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
    this.rate = value;
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
    this.overStar = this.overStar;
  }


  confirmSelection($event) {
    //console.log($event)
    //console.log(this.overStar)
    this.currentRecitationDetail.Rating = this.overStar;
    this.recitationDetailService.updateRecitation(this.currentRecitationDetail).subscribe(
      {
        next: response => this.onUpdateComplete("done"),
        error: err => console.log("error")
      });

  }


  validateSurah($event) {

    this.recitationDetailService.createRecitationDetail(this.currentRecitationDetail).subscribe(
      {
        next: response => {
          this.fautes.forEach(element => {
            if (element.clicked) {
              let model = {
                Id: 0,
                RecitationDetailId: response.Id,
                Wording: element.id
              }
              this.evaluationDetailleService.createLearningError(model).subscribe(
                {
                  next: response => this.onUpdateComplete("done"),
                  error: err => this.onUpdateComplete("error")
                });
            }
            else {
              this.evaluationDetailleService.deleteLearningError(element, response.Id).subscribe(
                {
                  next: response => this.onUpdateComplete("done"),
                  error: err => this.onUpdateComplete("error")
                });
            }

          });
          this.onUpdateComplete("done"),
            this.getEvaluationsList()
        },
        error: err => console.log("error")
      });
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
        timer: 4000,
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
  getEvaluationsList() {
    let modeltest: RecitationDetail = {
      RecitationId: Number(this.currentSessionId),
      StudentId: this.currentStudentId,
      DateEvaluation: this.currentRecitationDetail.DateEvaluation,
      Id: 0,
      RecitationSession: null,
      Student: null,
      Surah: 0,
      VerseDebut: 0,
      VerseFin: 0,
      Rating: 0,
      Remarques: ''

    }
    this.recitationDetailService.abc(modeltest).map(item => {
      let evaluationType = item[0] != null ? item[0].RecitationSession.TypeEvaluation : "D"
      return item.map(s => ({
        ...s,
        SurahName: this.searchSurahPoemeLabel(s.Surah, evaluationType, this.surahlist)

      }))
    }).subscribe((t) => {
      console.log(t)
      this.recitationDetailList = t;

    })
  }

  searchSurahPoemeLabel(id: number, typeEvaluation: string, surahList: any[]): string {
    if (typeEvaluation == "D") {
      let libsurah: any
      libsurah = surahList.filter((a) => a.number == id).map((d) => d.name + " | " + d.englishName).find(e => true)
      return libsurah
    }
    else {
      return ''
    }
  }

  /*goToerrors(item){
    const modalRef = this.modalService2.open(TajwidSubErrorsComponent);
     modalRef.componentInstance.item = this.item;

  }  */


}
