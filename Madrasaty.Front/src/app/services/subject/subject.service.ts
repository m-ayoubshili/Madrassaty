import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable ,  BehaviorSubject ,  of } from 'rxjs';
import { Subject } from 'src/app/models/subject';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjectUrl = environment.SUBJECT_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };

  subjectIdSource = new  BehaviorSubject<number>(0);
  subjectIdData: any;
  constructor(private http: HttpClient) {
    this.subjectIdData= this.subjectIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectUrl,this.httpOptions)
  }
  getSubject(id): Observable<Subject> {
    if (id === -1) {
      return of(this.initializeSubject());
    }
    return this.http.get<Subject>(this.subjectUrl+id,this.httpOptions)
  }

  createSubject(subject: Subject): Observable<Subject> {

    return this.http.post<Subject>(this.subjectUrl, subject,this.httpOptions)
  }
  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(this.subjectUrl+subject.Id, subject, this.httpOptions)
  }
  deleteSubject(id:number): Observable<Subject> {
    return this.http.delete<Subject>(this.subjectUrl+id, this.httpOptions)
  }
  changeSubjectId(subjectId: number){
    this.subjectIdSource.next(subjectId);
}
  private initializeSubject(): Subject {
    return {
      Id: 0,
      Name:null,
      Code:null,
      Coefficient:null,
      Description:null
    };
  }
}
