import { NotificationService } from 'src/app/services/notification/notification.service';
import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { PeriodicityService } from 'src/app/services/periodicity/periodicity.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { ExamensService } from 'src/app/services/Examens/examens.service';
import { Periodicity } from 'src/app/models/periodicity';
import { Subject } from 'src/app/models/subject';
import { Examen } from 'src/app/models/examen';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { MembersListService } from 'src/app/services/members/members-list.service';


@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: ExamenComponent}]
})
export class ExamenComponent implements OnInit {
 ExamenForm: FormGroup;
  examenFormGroup: FormGroup;
  teachers;
  selectedTime
  disciplinesList;
  DisciplineLevelList;
  rowData  
  search
  startTime
  DialogTitle
  switchbtn: boolean = false;
  Periodicities: Periodicity[] = [];
  Subjects: Subject[] = [];
  examensList: Examen[] = [];
  examen: Examen;
   pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
  bootstrapTime
  MemberStatusId
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  private User = JSON.parse(localStorage.getItem("currentUser"))["user"];
  errorMessage: any;
  BeginTime ='08:00:00';
  EndTime ='08:00:00';

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

  constructor( private members:MembersListService, private notification: NotificationService, private ExamensService: ExamensService, private fb: FormBuilder, private formBuilder: FormBuilder, private periodicityService: PeriodicityService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.examenFormGroup = this.formBuilder.group({
      DisciplineDropDown: [''],
      TeacherDropDown: ['']
    })

    this.ExamenForm = this.fb.group({
      Id: [0],
      Wording: ['', Validators.required],
      // Note:'',
      DisciplineLevelId: ['', Validators.required],
      DisciplineId: ['', Validators.required],
      TeacherId: ['', Validators.required],
      StartDate: ['', Validators.required],
      //EndDate: ['', Validators.required],
      BeginTime: [this.BeginTime, Validators.required],
      EndTime: [this.EndTime, Validators.required ],
      SchoolYearPeriodicityId: ['', Validators.required],
      SubjectId: ['', Validators.required],
      Coefficient: ['', [Validators.required,Validators.min(1)]]
    });
    
    this.members.getMemberStatus().subscribe((memberStatusData) => this.MemberStatusId = memberStatusData);
    this.ExamensService.getMembers().subscribe((teachersData: Member[]) => this.teachers = teachersData);
    console.log(this.teachers)

    this.ExamensService.getDisciplines().subscribe((disciplinesData) => this.disciplinesList = disciplinesData);
    this.periodicityService.getPeriodicitiesByActifSchoolYear().subscribe(periodicities => {
      this.Periodicities = periodicities
    })
    this.subjectService.getSubjects().subscribe(subjects => {
      this.Subjects = subjects
    })


    this.refreshExamenList();
  }


  
/* 
  displayExamen() {
    this.ExamensService.getExamens(JSON.parse(this.User).UserName) map(item => {
      return item.map(ex => {
        ex.StartDate = new Date(ex.StartDate + "Z")
        ex.EndTime = new Date(ex.EndTime + "Z")
        return ex
      })
    }) 
      .subscribe(
        {
          next: examensList => {
            this.examensList = examensList;
            this.rowData = examensList; 
            console.log(examensList)          
          },
          error: err => this.errorMessage = err
        });
  }
 */

  deleteItem(id: number) {
    this.notification.deleteElementAlert().then((result) => {
      if (result.value && id!=0) {
        this.ExamensService.deleteExamen(id)
          .subscribe({
            next: () =>  this.notification.onSaveComplete('warning',"Discipline","supprimée",this.refreshExamenList()),
            error: err => this.errorMessage = err
          });
      }  else
      {
        this.refreshExamenList()
      }
    })
   
  }

  searchResult(data){
    this.search=data
  }
/*   afterSaveExamen() {
    this.ExamensService.getExamens(JSON.parse(this.User).UserName).map(item => {
      return item.map(ex => {
        ex.StartDate = new Date(ex.StartDate + "Z")
        ex.EndTime = new Date(ex.EndTime + "Z")
        return ex
      })
    }).subscribe(
      {
        next: examensList => {
          this.examensList = examensList;
          this.rowData = this.examensList.filter(it => {
            return (it.DisciplineId.toString().includes(this.disciplineDropDown.value.toString()) && it.TeacherId.toString().includes(this.teacherDropDown.value.toString()));

          });
        },
        error: err => this.errorMessage = err
      });

  } */
  get disciplineDropDown() {
    return this.examenFormGroup.get('DisciplineDropDown');

  }
  get teacherDropDown() {
    return this.examenFormGroup.get('TeacherDropDown');

  }
  refreshExamenList() {
    this.ExamensService.getExamens(JSON.parse(this.User).UserName)
      .subscribe({
        next: ExamensData => {
          this.rowData = ExamensData;
          this.examensList = ExamensData;
      
          console.log(this.examensList)
        },
        error: err => this.errorMessage = err
      });
  }

  OpenDiag(id: number) {  
    this.DialogTitle  = id === -1 ? 'Add Examen' : 'Edit Examen';
    this.ExamensService.getExamenById(id)
      .subscribe({
        next: (examen: Examen) => this.displayExamen(examen),
        error: err => console.log(err)
      });
      console.log(id)
    }

    saveExamen(): void {   

      if (this.ExamenForm.valid) {
        if (this.ExamenForm.dirty) {
          const aux = { ...this.examen, ...this.ExamenForm.value };
          if (aux.Id === 0 || aux.Id === '' || aux.Id === null) {
            this.ExamensService.createExamen(aux)
              .subscribe({
                next: () =>this.notification.onSaveComplete("success","Examen","ajouté", this.refreshExamenList()),
                error: err => this.errorMessage = err
              });
  
          } else {
            this.ExamensService.updateExamen(aux)
              .subscribe({
                next: () => this.notification.onSaveComplete("success","Examen","modifié", this.refreshExamenList()),
                error: err => this.errorMessage = err
              });
          }
  
        } else {
   
        }
      } else {
        this.errorMessage = 'Please correct the validation errors.';
      }  
    }

    displayExamen(examen: Examen): void {
      if (this.ExamenForm) {
        this.ExamenForm.reset();
      }
      this.examen = examen;
      this.ExamenForm.patchValue({
        Id: this.examen.Id,
        StartDate: new Date(this.examen.StartDate+"Z"),
        EndDate: new Date(this.examen.EndDate+"Z"),
        Wording: this.examen.Wording,
        Note: this.examen.Note,
        DisciplineLevelId: this.examen.DisciplineLevelId,
        DisciplineId: this.examen.DisciplineId,
        TeacherId: this.examen.TeacherId,
        BeginTime: new Date(this.examen.BeginTime+"Z").toTimeString().split(' ')[0],
        EndTime:new Date(this.examen.EndTime+"Z").toTimeString().split(' ')[0],
        SchoolYearPeriodicityId: this.examen.SchoolYearPeriodicityId,
        SubjectId: this.examen.SubjectId,
        Coefficient: this.examen.Coefficient
      });
      this.ExamensService.getLevelsByDiscipline(this.disciplineDropDown.value)
        .subscribe(data => this.DisciplineLevelList = data);
        console.log(this.ExamenForm.value)
    }


 
    refreshLevels(selectedDiscipline) {    
   this.ExamensService.getLevelsByDiscipline(selectedDiscipline)
        .subscribe(data => {this.DisciplineLevelList = data } );
    }
  
    showNote(note) {  
      Swal({
        title: "<h2>Note Examen</h2>",
        html: "<div><p>Vous avez obtenu la note de <b>" + note + "</b> à cet examen.</p></div>",
        confirmButtonText: "<u>Ok</u>",
      });  
    };  
}
