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
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit {
  ExamenForm: FormGroup;
  examenFormGroup: FormGroup;
  teachers;
  disciplinesList;
  DisciplineLevelList;
  rowData  
  Periodicities: Periodicity[] = [];
  Subjects: Subject[] = [];
  examensList: Examen[] = [];
  private User = JSON.parse(localStorage.getItem("currentUser"))["user"];
  errorMessage: any;
  constructor( private ExamensService: ExamensService, private fb: FormBuilder, private formBuilder: FormBuilder, private periodicityService: PeriodicityService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.examenFormGroup = this.formBuilder.group({
      DisciplineDropDown: [''],
      TeacherDropDown: ['']
    })

    this.ExamenForm = this.fb.group({
      Id: ['', Validators.required],
      Wording: ['', Validators.required],
      // Note:'',
      DisciplineLevelId: ['', Validators.required],
      DisciplineId: ['', Validators.required],
      TeacherId: ['', Validators.required],
      StartDate: ['', Validators.required],
      //EndDate: ['', Validators.required],
      BeginTime: ['', Validators.required],
      EndTime: ['', Validators.required],
      SchoolYearPeriodicityId: ['', Validators.required],
      SubjectId: ['', Validators.required],
      Coefficient: ['', [Validators.required,Validators.min(1)]]
    });
    
    this.displayExamen();
    this.ExamensService.getMembers().subscribe((teachersData: Member[]) => this.teachers = teachersData);
    console.log(this.teachers)

    this.ExamensService.getDisciplines().subscribe((disciplinesData) => this.disciplinesList = disciplinesData);
    this.periodicityService.getPeriodicitiesByActifSchoolYear().subscribe(periodicities => {
      this.Periodicities = periodicities
    })
    this.subjectService.getSubjects().subscribe(subjects => {
      this.Subjects = subjects
    })
  }

  displayExamen() {
    this.ExamensService.getExamens(JSON.parse(this.User).UserName).map(item => {
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
            console.log("hhh"+ this.rowData)
          },
          error: err => this.errorMessage = err
        });
  }

  deleteItem(id: number) {
    this.deleteElementAlert().then((result) => {
      if (result.value) {
        this.ExamensService.deleteExamen(id)
          .subscribe({
            next: () => this.afterSaveExamen(),
            error: err => this.errorMessage = err
          });
      }
    })
  }
  deleteElementAlert() {
    return Swal({
      title: 'Etes-vous sûr de vouloir supprimer cet élément?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer',
      type: 'warning',
      cancelButtonText: 'Annuler',
    })
  }

  afterSaveExamen() {
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

  }
  get disciplineDropDown() {
    return this.examenFormGroup.get('DisciplineDropDown');

  }
  get teacherDropDown() {
    return this.examenFormGroup.get('TeacherDropDown');

  }
  refreshExamenList() {
    this.ExamensService.getExamens(JSON.parse(this.User).UserName).map(item => {
      return item.map(ex => {
        ex.StartDate = new Date(ex.StartDate + "Z")
        ex.EndTime = new Date(ex.EndTime + "Z")
        return ex
      })
    })
      .subscribe({
        next: ExamensData => {
          this.rowData = ExamensData;
          this.examensList = ExamensData;
        },
        error: err => this.errorMessage = err
      });
  }

  OpenDiag(id){}
  switchToCard(){}

}
