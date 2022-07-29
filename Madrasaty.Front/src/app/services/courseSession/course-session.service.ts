import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseSession } from 'src/app/models/courseSession';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseSessionService {

  private courseSessionUrl = environment.COURSE_SESSION_URL;
  private courseUrl = environment.COURSE_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.accessToken
    })
  };
  courseSessionIdSource = new BehaviorSubject<number>(0);
  courseSessionIdData: any;
  constructor(private http: HttpClient) {
    this.courseSessionIdData = this.courseSessionIdSource.asObservable();
  }

  getCourseSession(Id: number): Observable<CourseSession[]> {
    return this.http.get<CourseSession[]>(this.courseSessionUrl + Id, this.httpOptions)
  }
  getCourseSessionsByCourseId(CourseId: number): Observable<CourseSession[]>{
    return this.http.get<CourseSession[]>(this.courseUrl + CourseId, this.httpOptions)
  }
  getCourseSessions(): Observable<CourseSession[]> {
    return this.http.get<CourseSession[]>(this.courseSessionUrl, this.httpOptions)
  }
  createCourseSession(courseSession: CourseSession): Observable<CourseSession> {
    return this.http.post<CourseSession>(this.courseSessionUrl, courseSession, this.httpOptions)
  }
  updateCourseSession(courseSession: CourseSession): Observable<CourseSession> {
    return this.http.put<CourseSession>(this.courseSessionUrl + courseSession.Id, courseSession, this.httpOptions)
  }
  deleteCourseSession(id: number): Observable<CourseSession> {
    return this.http.delete<CourseSession>(this.courseSessionUrl + id, this.httpOptions)
  }
}
