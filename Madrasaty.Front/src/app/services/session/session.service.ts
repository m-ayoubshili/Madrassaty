import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Session } from 'protractor';
import { Observable, BehaviorSubject, of, empty, EMPTY } from 'rxjs';
import { Recurrence } from 'src/app/models/recurrence';
import { RecitationSessionModel } from 'src/app/models/recitation-session-model';
import { RecitationSessionPostModel } from 'src/app/models/recitation-session-post-model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionUrl = environment.SESSION_URL;
  private reccurenceUrl =environment.RECURRENCE_URL;
 sessionIdData: any;
  sessionIdSource = new  BehaviorSubject<number>(0);
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };
  constructor(private http: HttpClient) {
    this.sessionIdData= this.sessionIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }
  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.sessionUrl,this.httpOptions)
  }
  changeSessionId(sessionId: number){
    this.sessionIdSource.next(sessionId);
}
getReccurence(): Observable<Recurrence[]> {
  return this.http.get<Recurrence[]>(this.reccurenceUrl,this.httpOptions)
}

getSession(id): Observable<RecitationSessionModel> {
  if (id === -1) {
    return of(this.initializeSession());
  }
  return this.http.get<RecitationSessionModel>(this.sessionUrl+id,this.httpOptions)
}
private initializeSession(): RecitationSessionModel {
  return {
    Id :0,
        Title :'',
        IsSaved :false,
        TeacherId :'',
        ClassroomId :0,
        Description :'',
        StartDate :new Date(),
        EndTime :new Date(),
        DivisionParam :0,
        CreatedOn :new Date(),
        ModifiedOn :new Date(),
        RecurrenceId :0,
        DisciplineId :0,
        IdStudents :[],
        TypeEvaluation :'',
        Jour :'',
        T1 :new Date(Date.now()),
        T2 :new Date(Date.now()),
        T3:new Date(Date.now()),
  };
}
createSession(session: RecitationSessionPostModel): Observable<RecitationSessionPostModel> {
  console.log(session)
  return this.http.post<RecitationSessionPostModel>(this.sessionUrl, session,this.httpOptions)
    .pipe(
      tap(data => console.log('createSession: ' + JSON.stringify(data)),
      error=> console.log(error)
      ),
    );
}


updateSession(session: RecitationSessionPostModel): Observable<RecitationSessionPostModel> {
  return this.http.put<RecitationSessionPostModel>(this.sessionUrl+session.Id, session,this.httpOptions)
    .pipe(
      tap(data => console.log('updateSession: ' + JSON.stringify(data)),
      error=> console.log(error)
      ),
    );
}

deleteSession(id:number): Observable<RecitationSessionPostModel> {
  return this.http.delete<RecitationSessionPostModel>(this.sessionUrl+id, this.httpOptions)
    .pipe(
      tap(data => console.log('deleteSession: ' + id),
          error=> console.log(error))
    );
}
}
