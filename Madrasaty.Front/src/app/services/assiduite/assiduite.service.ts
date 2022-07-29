import { Injectable } from '@angular/core';
import { Assiduite } from 'src/app/models/assiduite';
import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AssiduiteService {
  courseSessionId;
  levelId;
  disciplineId;
  private assiduitesUrl = environment.ASSIDUITE_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };
  assiduiteIdSource = new  BehaviorSubject<number>(0);
  assiduiteIdData: any;
  constructor(private http: HttpClient) {
    this.assiduiteIdData= this.assiduiteIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }

  getAssiduites(courseSessionId, levelId, disciplineId): Observable<Assiduite[]> {
    return this.http.get<Assiduite[]>(this.assiduitesUrl +"?courseId="+ courseSessionId + "&levelId="+levelId+"&DisciplineId="+disciplineId, this.httpOptions)
  }

  updateAssiduite(assiduite: Assiduite): Observable<Assiduite> {
    return this.http.put<Assiduite>(this.assiduitesUrl, assiduite, this.httpOptions)
      .pipe(
        tap(() => console.log('updateAssiduite: ' + assiduite.Id)),
        map(() => assiduite)

      );
  }

  updateAllAssiduite(model){
    return this.http.post(this.assiduitesUrl+ "?courseId=" + model.CourseSessionId + "&disciplineId=" + model.DisciplineId + "&levelId=" + model.LevelId + "&present=" + model.Present, null, this.httpOptions)
  }
}




