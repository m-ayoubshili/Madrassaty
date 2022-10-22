import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent, merge, Observable } from 'rxjs';
import { Classroom } from 'src/app/models/classroom';
import { Course } from 'src/app/models/course';
import { Discipline } from 'src/app/models/discipline';
import { DisciplineLevel } from 'src/app/models/DisciplineLevel';
import { Member } from 'src/app/models/member';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import { CourseService } from 'src/app/services/course/course.service';
import { DisciplineService } from 'src/app/services/discipline/discipline.service';
import { LevelService } from 'src/app/services/level/level.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import swal from 'sweetalert2';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: CourseComponent}]
})
export class CourseComponent implements OnInit {
  switchbtn: boolean = false;
  rowData;
  courseFormGroup: FormGroup;
  courseForm: FormGroup;
  courses: Course[] = [];
  columnDefs
  teachers: Member[];
  filtredList;
  disciplinesList;
  teachersList;
  subjectsList;
  DialogTitle: string;
  errorMessage = '';
  modalTitle: string;
  course: Course;
  DisciplineLevelList: DisciplineLevel[];

  disciplines: Discipline[] = [];
  RecurrenceList;
  
  search
  displayMessage: { [key: string]: string } = {};

  classrooms: Classroom[] = [];
  displayedColumns: string[] = ['Cours', 'Enseignant', 'Discipline', 'Salle' ,'Date','Actions'];

 slotList : number[] = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
 DaysList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
ReccurenceValue = 0;

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

  constructor(private router: Router,private courseService: CourseService, private dialog: MatDialog ,private levelService: LevelService,
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    private notification: NotificationService ) {
     
      this.courseForm = this.formBuilder.group({
        Name: ['', Validators.required],
        StartDate: [new Date(), Validators.required],
        TeacherId: ['', Validators.required],
        DisciplineId: ['', Validators.required],
        DisciplineLevelId: ['', Validators.required],
        ClassroomId: ['', Validators.required],
        Begin: [new Date(), Validators.required],
        End: [new Date(), Validators.required],
        RecurrenceId: ['', Validators.required],
        Jour: [''],
        T1: [''],
        T2: [''],
        T3: [''],
      });

      this.courseService.getMembers().subscribe((teachersData: Member[]) => this.teachers = teachersData);
       this.courseService.getMembers().subscribe((teachersData: Member[]) => this.teachersList = teachersData);
       this.courseService.getSubjects().subscribe((subjectData) => this.subjectsList = subjectData);
       this.courseService.getDisciplines().subscribe((disciplinesData) => this.disciplinesList = disciplinesData);
       this.classroomService.getClassrooms().subscribe((classroomsData) => this.classrooms = classroomsData);
       this.courseService.getReccurence().subscribe((reccurencesData) => this.RecurrenceList = reccurencesData);


   this.refreshCourseList()
     }

  ngOnInit() {

  
    this.courseFormGroup = this.formBuilder.group({
      DisciplineDropDown: [''],
      TeacherDropDown: ['']
    });

  }

  switchToCard(){
    this.switchbtn = !(this.switchbtn);
  }
  OpenDiag(id: number) {   
    this.DialogTitle = id == -1 ? "Ajouter un cours" : "Modifier un cours"
   this.courseService.getCourse(id)
      .subscribe({
        next: (course: Course) => this.displayCourse(course),
        error: err => console.log(err)
      }); 
    }
    displayCourse(course: Course): void {

      console.log(course.StartDate)
      if (this.courseForm) {
        this.courseForm.reset();
      }
      this.levelService.getLevelsByDiscipline(course.DisciplineId)
        .subscribe(data => this.DisciplineLevelList = data);
      this.course = course;
      this.ReccurenceValue=this.course.RecurrenceId!=null?this.course.RecurrenceId:0;
      this.courseForm.patchValue({
        Name: this.course.Name,
        StartDate: new Date(this.course.StartDate + "Z"),
        EndTime: new Date(this.course.EndTime + "Z"),
        Begin: new Date(this.course.Begin + "Z").toTimeString().split(' ')[0],
        End: new Date(this.course.End + "Z").toTimeString().split(' ')[0],
        TeacherId: this.course.TeacherId,
        DisciplineId: this.course.DisciplineId,
        ClassroomId: this.course.ClassroomId,
        DisciplineLevelId: this.course.DisciplineLevelId,
        RecurrenceId: this.course.RecurrenceId != null ? this.course.RecurrenceId : 0,
        Jour: this.course.Jour,
        T1: this.course.T1 != null ? new Date(this.course.T1 + "Z") : new Date(Date.now()),
        T2: this.course.T2 != null ? new Date(this.course.T2 + "Z") : new Date(Date.now()),
        T3: this.course.T3 != null ? new Date(this.course.T3 + "Z") : new Date(Date.now())
      });
    }

    
  searchResult(data){
    this.search=data 
  }
  startNewCourseSession(course){
    this.AlertcreateNewCourseSession().then((result) => {
      if (result.value) {
       
        this.router.navigate(['/crafted/evaluation/course/course-session/'+course]);
      }
    })
  }


  refreshLevels(selectedDiscipline) {
    this.levelService.getLevelsByDiscipline(selectedDiscipline)
      .subscribe(data => this.DisciplineLevelList = data);
  }
  get disciplineDropDown() {
    return this.courseFormGroup.get('DisciplineDropDown');

  }
  refreshReccurenceValue() {
    this.ReccurenceValue = this.ReccurenceDropDown.value

  }
  get ReccurenceDropDown() {
    return this.courseForm.get('RecurrenceId');

  }
  listCourseSessions(course){
    this.router.navigate(['setting/course/'+ course.Id +'/course-session-list']);
  }
  AlertcreateNewCourseSession() {
    return swal({
      title: 'Vous êtes sur le point de créer une séance de cours. Voulez-vous continuer?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer',
      type: 'info',
      cancelButtonText: 'Annuler',
    })
  }
/*   displayCourses() {
    this.courseService.getCourses().map(item => {
      return item.map(cours => {
        cours.StartDate = new Date(cours.StartDate + "Z")
        cours.EndTime = new Date(cours.EndTime + "Z")
        return cours
      })
    })
      .subscribe(
        {
          next: coursesList => {
            this.courses = coursesList;
            this.filtredList = coursesList;
            this.rowData = coursesList
          },
          error: err => this.errorMessage = err
        });
  } */
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
  refreshCourseList() {
    this.courseService.getCourses().subscribe({
      next: coursesList => {
        this.rowData = coursesList;
      
        console.log(this.rowData);
      },
      error: err => this.errorMessage = err
    });
  }
  deleteItem(id: number) {

    this.deleteElementAlert().then((result) => {
      if (result.value) {
        this.courseService.deleteCourse(id)
          .subscribe({
            next: () => {
              this.refreshCourseList(),
                swal({
                  position: 'top',
                  title: "Cours supprimé avec succès",
                  type: 'success',
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

  saveCourse(): void {

    if (this.courseForm.valid) {
      if (this.courseForm.dirty) {
        const cour = { ...this.course, ...this.courseForm.value };

        if (cour.Id === 0 || cour.Id === '' || cour.Id === null) {
          this.courseService.createCourse(cour)
            .subscribe({              
              next: () => this.notification.onSaveComplete('success',"Cour ","ajoutée",this.refreshCourseList()),
              error: err => this.errorMessage = err
            });
        } else {
          this.courseService.updateCourse(cour)
            .subscribe({         
              next: () => this.notification.onSaveComplete('success',"Cour","modifiée",this.refreshCourseList()),
              error: err => this.errorMessage = err
            });
        }
        console.log(cour);
      } else {
    
      }
    }
    else {
      this.errorMessage = 'Please correct the validation errors.';
    } 

  }


}
