import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/course';
import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Discipline } from 'src/app/models/discipline';
import { Recurrence } from 'src/app/models/recurrence';

@Injectable()
export class CourseService {

  private coursesUrl = environment.COURSE_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };

  courseIdSource = new  BehaviorSubject<number>(0);
  courseIdData: any;
  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.courseIdData= this.courseIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl,this.httpOptions)
  }
  getCourse(id): Observable<Course> {
    if (id === -1) {
      return of(this.initializeCourse());
    }
    return this.http.get<Course>(this.coursesUrl+id,this.httpOptions)
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course,this.httpOptions)
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.coursesUrl+course.Id, course, this.httpOptions)
  }
  deleteCourse(id:number): Observable<Course> {
    return this.http.delete<Course>(this.coursesUrl+id, this.httpOptions)
  }
  changeCourseId(courseId: number){
    this.courseIdSource.next(courseId);
}
getDisciplines(){
  return this.http.get<Discipline>(environment.BASE_URL+"Disciplines",this.httpOptions)
}
getMembers()
{
  return this.http.get(environment.BASE_URL+"Members/Teachers",this.httpOptions);
}
getSubjects(){
  return this.http.get(environment.SUBJECT_URL,this.httpOptions);
}
getPeriodicities(){
  return this.http.get(environment.PERIODICITY_URL,this.httpOptions);
}
getReccurence(): Observable<Recurrence[]> {
  return this.http.get<Recurrence[]>(environment.RECURRENCE_URL,this.httpOptions)
}

  private initializeCourse(): Course {
     return {
      Id: 0,
      Name: '',
      ClassroomId: 0,
      DisciplineLevelId: 0,
      DisciplineId: 0,
      TeacherId: 0,
      StartDate:new Date() ,
      EndTime: new Date(),
      Begin: new Date(),
      End: new Date(),
      DisciplineLevel: '',
      Classroom: '',
      Teacher: '',
      Discipline: '',
      Subject: '',
      Jour :'',
      T1 :new Date(Date.now()),
      T2 :new Date(Date.now()),
      T3:new Date(Date.now()),
      RecurrenceId :0,
      DisabledToCreate:false
    };
  }
}
