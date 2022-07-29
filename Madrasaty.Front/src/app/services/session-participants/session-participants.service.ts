import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from 'src/app/models/member';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { RecitationSessionModel } from 'src/app/models/recitation-session-model';

@Injectable({
  providedIn: 'root'
})
export class SessionParticipantService {
  private url = environment.STUDENTRECITATION_URL;
  private sessionUrl = environment.SESSION_URL;
  sessionId;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.accessToken
    })
  };

  sessionIdSource = new BehaviorSubject<number>(0);
  sessionIdData: any;
  constructor(private http: HttpClient) {
    this.sessionIdData = this.sessionIdSource.asObservable();
  }


  getSession(id): Observable<RecitationSessionModel> {

    return this.http.get<RecitationSessionModel>(this.sessionUrl+id,this.httpOptions)
  }

  GetStudents(sessionId): Observable<Member[]> {
    return this.http.get<Member[]>(this.url + sessionId, this.httpOptions);
  }
}
