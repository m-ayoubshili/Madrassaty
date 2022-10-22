import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/models/member';
import { MemberFilter } from 'src/app/models/member-filter';
import { RecitationSessionModel } from 'src/app/models/recitation-session-model';
import { RecitationSessionPostModel } from 'src/app/models/recitation-session-post-model';
import { Session } from 'src/app/models/session';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import { DisciplineService } from 'src/app/services/discipline/discipline.service';
import { ExamensService } from 'src/app/services/Examens/examens.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SessionParticipantService } from 'src/app/services/session-participants/session-participants.service';
import { SessionService } from 'src/app/services/session/session.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: SessionComponent}]
})
export class SessionComponent implements OnInit {
  students: MemberFilter[] = [];
  rowData
  reccurenceList;
  sessionsList= [];
  reccurenceFormGroup: FormGroup;
  sessionForm: FormGroup;
  search
  switchbtn: boolean = false;
  DialogTitle
  session: RecitationSessionModel;
  ReccurenceValue
  sessionPost :RecitationSessionPostModel;
  LevelList
  PhotoPath
  DaysList
  checked = false;
  slotList :number[];
  classrooms
  teachers
  DisciplineList
  currentSessionId
  BeginTime="18:22:55"
  errorMessage = '';
  teacher
  pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.toString().split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }
  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}` : null;
  }
  constructor(private sessionService: SessionService,private classroomService :ClassroomService , 
    private memberService: MembersListService,  private notification: NotificationService,private disciplineService: DisciplineService,
    private formBuilder: FormBuilder,private examenService: ExamensService) { }

  ngOnInit(): void {
    this.sessionForm = this.formBuilder.group({
      Id: [0],
      Title: ['', Validators.required],
       Description: ['', Validators.required],
       RecurrenceId: ['', Validators.required],
      DisciplineId: ['', Validators.required],
      LevelIds: ['', Validators.required],
      StartDate: [new Date()],
       DivisionParam: ['', Validators.required],
       EndTime: ['',new Date()],
       TeacherId: ['', Validators.required],
       IsSaved: [''],
       ClassroomId:['', Validators.required],
       TypeEvaluation:[''],
       Jour:[''],
       T1:[''],
       T2:[''],
       T3:[''],
    });
    
    this.reccurenceFormGroup = this.formBuilder.group({
      reccurenceDropDown: ['']
    })

    this.disciplineService.getDisciplines().subscribe(
      (discplinesData) => this.DisciplineList = discplinesData,
      (error) => console.log(error)
    );
    this.sessionService.getReccurence().subscribe(
      (reccurencesData) => this.reccurenceList = reccurencesData,
      (error) => console.log(error)
    );
    this.sessionService.getSessions().subscribe({
      next: sessions => {
        this.rowData = sessions;
        this.sessionsList = sessions;
        console.log(this.rowData);
      },
      error: err => this.errorMessage = err
    });


    this.LevelList=[];
    this.slotList=[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    this.DaysList=['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    this.examenService.getMembers().subscribe((teachersData: Member[]) => this.teachers = teachersData);
    this.classroomService.getClassrooms().subscribe((classroomsData) => this.classrooms = classroomsData);
    this.ReccurenceValue=0;

    this.getSession();


  }

  getSession(): void {
    this.sessionService.sessionIdData.subscribe(data => {
      this.currentSessionId = data;
      this.sessionService.getSession(this.currentSessionId)
        .subscribe({
          next: (session: RecitationSessionModel) => this.displaySession(session),
          error: err => console.log(err)
        });
    })

  }
  refreshSessionList() {
    this.sessionService.getSessions().subscribe({
      next: sessions => {
        
        this.rowData = sessions;
      },
      error: err => this.errorMessage = err
    });
  }

  searchResult(data){
    this.search=data
  }
  get ReccurenceDropDown() {
    return this.sessionForm.get('RecurrenceId');

  }
  
  refreshReccurenceValue() {
    this.ReccurenceValue=this.ReccurenceDropDown.value
      
  }
  
  
  OpenDiag(id: number) {  
    this.DialogTitle  = id === -1 ?  'Ajouter une session' : 'Modifier une session';
    this.sessionService.getSession(id)
      .subscribe({
        next: (session: Session) => this.displaySession(session),
        error: err => console.log(err),
       
      });
      console.log(id)
    }

    displaySession(session: RecitationSessionModel): void {
   
      if (this.sessionForm) {
        this.sessionForm.reset();
      }
      //this.refreshLevels();
      this.session = session;
      this.ReccurenceValue=this.session.RecurrenceId;
  
      this.sessionForm.patchValue({
        
         Id :this.session.Id,
          Title :this.session.Title,
          IsSaved :this.session.IsSaved,
          Description :this.session.Description,
          StartDate :new Date(this.session.StartDate+"Z").toTimeString().split(' ')[0],
          EndTime :new Date(this.session.EndTime+"Z").toTimeString().split(' ')[0],
          DivisionParam :this.session.DivisionParam,
          RecurrenceId :this.session.RecurrenceId,
          DisciplineId :this.session.DisciplineId,
          ClassroomId:this.session.ClassroomId,
          TeacherId:this.session.TeacherId,
          TypeEvaluation:this.session.TypeEvaluation,
          Jour:this.session.Jour,
          T1:new Date(this.session.T1+"Z"),
          T2:new Date(this.session.T2+"Z"),
          T3:new Date(this.session.T3+"Z")
  
      });
      console.log(this.sessionForm.value)
    }

  deleteSession(id: number) {

    this.notification.deleteElementAlert().then((result) => {
      if (result.value && id!=0) {
        this.sessionService.deleteSession(id)
          .subscribe({
            next: () => this.notification.onSaveComplete('warning',"Discipline","supprimée",this.refreshSessionList()),
            error: err => this.errorMessage = err
          });
       
      }else{
        this.refreshSessionList()
      }
    })
  }


  getmemeberPhoto(name){
    this.memberService.getMembers().subscribe((members)=>  { 
    this.teacher=members.filter(t=>t.FirstName==name)
    this.PhotoPath = this.memberService.GetMemberPhotoPath( this.teacher.PhotoPath)
    }
    );  
  }
  
  refreshLevels(selectedDiscipline) {
    this.examenService.getLevelsByDiscipline(selectedDiscipline)
      .subscribe(data => this.LevelList = data);
  }

  get reccurenceDropDown() {
    return this.reccurenceFormGroup.get('reccurenceDropDown');

  }
  get disciplineDropDown() {
    return this.sessionForm.get('DisciplineId');

  }
  changeReccurence(arg:any) {
    this.students=[];
    this.students.length = 0;
    this.rowData = this.sessionsList.filter(it => {
      return (it.RecurrenceId.toString().includes(this.reccurenceDropDown.value.Id.toString()))

    }); 
  }


  saveSession(): void {
    console.log(this.sessionForm.value)
    if (this.sessionForm.valid) {
      const sc = { ...this.sessionPost, ...this.sessionForm.value };
      console.log(sc)
      //if (this.sessionForm.dirty) {
     if (sc.Id === 0) {
          console.log(this.sessionForm.value)
        this.sessionService.createSession(sc)
          .subscribe({
            next: () => this.notification.onSaveComplete("success","Session","ajouté", this.refreshSessionList()),
            error: err => this.errorMessage = err
          });
        }
      else{
        this.sessionService.updateSession(sc)
        .subscribe({
         next: () =>  this.notification.onSaveComplete("success","Session","modifié", this.refreshSessionList()),
            error: err => this.errorMessage = err
          });
         
      } 
    }
  
  }
}
