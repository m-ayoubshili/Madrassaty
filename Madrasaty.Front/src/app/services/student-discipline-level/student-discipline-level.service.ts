import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StudentDisciplineLevel } from 'src/app/models/student-discipline-level';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDisciplineLevelService {
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.accessToken
    })
  };
  constructor(private http: HttpClient) { }
  getStudentDisciplineLevel(studentId: string, disciplineId: number): Observable<StudentDisciplineLevel> {
    return this.http.get<StudentDisciplineLevel>(environment.STUDENT_DISCIPLINELEVEL_URL + "?studentId=" + studentId.toString() + "&disciplineId=" + disciplineId, this.httpOptions)
  }
}
