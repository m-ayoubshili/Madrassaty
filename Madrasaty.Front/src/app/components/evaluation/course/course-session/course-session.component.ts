import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assiduite } from 'src/app/models/assiduite';
import { Classroom } from 'src/app/models/classroom';
import { Course } from 'src/app/models/course';
import { CourseSession } from 'src/app/models/courseSession';
import { MemberFilter } from 'src/app/models/member-filter';
import { AssiduiteService } from 'src/app/services/assiduite/assiduite.service';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import { CourseService } from 'src/app/services/course/course.service';
import { CourseSessionService } from 'src/app/services/courseSession/course-session.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import swal from 'sweetalert2';

@Component({
  selector: 'app-course-session',
  templateUrl: './course-session.component.html',
  styleUrls: ['./course-session.component.scss']
})
export class CourseSessionComponent implements OnInit {
  courseSessionForm: FormGroup;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  currentCourseSession: CourseSession;
  currentCourseId: string;
  currentCourse: Course;
  errorMessage: any;
  showtogglePresence: boolean = false;
  presences: Assiduite[] = [];
  pres: Assiduite;
  model;
  presence;
  courseId;
  levelId;
  disciplineId;
  students: MemberFilter[] = [];
  nb;
  claasroomId;
  classromm:Classroom;
  PhotoPath
  constructor(private courseSessionService: CourseSessionService, private router: Router, private courseService: CourseService, private notification: NotificationService,
     private formBuilder: FormBuilder, private route: ActivatedRoute, private presenceService: AssiduiteService,
     private memberService: MembersListService,private classroomService: ClassroomService) { 
   
    const param = this.route.snapshot.paramMap.get('Id');
    if (param) {
      this.currentCourseId = param;
      this.courseService.getCourse(param).subscribe((data) => {
        this.currentCourse = data
        this.courseId = this.currentCourse["Id"];
        this.claasroomId=this.currentCourse["ClassroomId"]
        this.levelId = this.currentCourse["DisciplineLevelId"];
        this.disciplineId = this.currentCourse["DisciplineId"];
        this.initCourseSesssion(this.currentCourse);
        this.presenceService.getAssiduites(this.courseId, this.levelId, this.disciplineId).subscribe({
          next: presences => {
            this.presences = presences;
            console.log(presences);
          },
          error: err => this.errorMessage = err
        });
        this.memberService.GetStudents(this.levelId)
        .subscribe({
          next: levels =>{
            this.students = levels;
            this.nb=this.students.length;
           
          },
          error: err => console.log(err)
        });
        this.classroomService.getClassroom(this.claasroomId)
        .subscribe({
          next: classroom => {this.classromm=classroom;
            console.log(classroom);
          }
        });
      })
    }

   
    
    this.validationMessages = {
      Remarque: {
        required: 'Ce champ est obligatoire.'
      }
    };
  }

  ngOnInit() {
    
    this.courseSessionForm = this.formBuilder.group({
      Remarque: ['', Validators.required]
    });

    this.memberService.getMember(this.currentCourse.TeacherId)
    .subscribe({
      next: (member: any) => {
        this.PhotoPath = this.memberService.GetMemberPhotoPath(member.PhotoPath)
       console.log( this.PhotoPath)
      }
    });
   /*  this.courseId = this.currentCourse["Id"];
    console.log(this.courseId)
    this.levelId = this.currentCourse["DisciplineLevelId"];
    console.log(this.levelId)
    this.disciplineId = this.currentCourse["DisciplineId"];
    console.log(this.disciplineId) */
/*     this.presenceService.getAssiduites(this.courseId, this.levelId, this.disciplineId).subscribe({
      next: presences => {
        this.presences = presences;
        console.log(presences);
      },
      error: err => this.errorMessage = err
    }); */
  }
   getCurrentCourseFromURL() {
    const param = this.route.snapshot.paramMap.get('Id');
    if (param) {
      this.currentCourseId = param;
      this.courseService.getCourse(param).subscribe((data) => {
        this.currentCourse = data
        this.initCourseSesssion(this.currentCourse)
      })
    }
  } 
  initCourseSesssion(currentCourse: Course) {
    let courseSessionModel: CourseSession = {
      Id: 0,
      Wording: "",
      CourseName: "",
      CourseId: currentCourse.Id,
      StartDate: currentCourse.StartDate,
      EndTime: currentCourse.EndTime,
      Begin: currentCourse.Begin,
      End: currentCourse.End,
      Remarque: ""
    }
    this.courseSessionService.createCourseSession(courseSessionModel).subscribe({
      next: response => {
        this.currentCourseSession = response
      /*   this.courseSessionForm.patchValue({
          Remarque: response.Remarque
        }); */
      },
      error: err => console.log("error")
    })
  }
  saveCourseSession(): void {
     if (this.courseSessionForm.valid) {
      if (this.courseSessionForm.dirty) {
        const courseSession = { ...this.currentCourseSession, ...this.courseSessionForm.value };
        this.courseSessionService.updateCourseSession(courseSession)
          .subscribe({
            next: () => { swal({ position: 'top', type: "success",  title: "La séance de cours est mis à jour", showConfirmButton: false, timer: 3000, toast: true })},
            error: err => this.errorMessage = err
          });
          this.router.navigate(['/crafted/evaluation/course/']);
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    } 
  }

  togglePresence(show: boolean) {
    this.showtogglePresence = show;
  }
  updatePresence(pres) {
    this.model = {
      StudentId: pres.MemberId,
      CourseSessionId: this.currentCourse["Id"],
      Present: pres.Present
    }
    this.presenceService.updateAssiduite(this.model).subscribe({
      next: presences => {
        this.pres = presences;
        this.notification.onSaveComplete("success","Présence","modifié", this.refreshPresenceList(this.model.CourseId, this.model.LevelId, this.model.DisciplineId))
      },
      error: err => this.errorMessage = err
    });
   
  }

/*   updateAll(status) {
    this.model = {
      CourseId: this.currentCourse["Id"],
      Present: status
    }

    this.presenceService.updateAllAssiduite(this.model).subscribe({
      next: presences => {
        this.presence = presences;
        this.notification.onSaveComplete("success","Présence","modifié", this.refreshPresenceList(this.model.CourseId, this.model.LevelId, this.model.DisciplineId))
      },
      error: err => this.errorMessage = err
    });

  } */

  refreshPresenceList(courseId, levelId, disciplineId) {
    this.presenceService.getAssiduites(courseId, levelId, disciplineId).subscribe({
      next: presences => {
        this.presences = presences;
      },
      error: err => this.errorMessage = err
    });
  }
}
