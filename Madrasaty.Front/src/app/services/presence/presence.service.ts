import { Injectable } from '@angular/core';
import { Presence } from 'src/app/models/presence';
import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PresenceService {
  courseId;
  levelId;
  disciplineId;
  private presencesUrl = environment.PRESENCE_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };

  presenceIdSource = new  BehaviorSubject<number>(0);
  presenceIdData: any;
  constructor(private http: HttpClient) {
    this.presenceIdData= this.presenceIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }

  getPresences(courseId, levelId, disciplineId): Observable<Presence[]> {
    return this.http.get<Presence[]>(this.presencesUrl +"?courseId="+ courseId + "&levelId="+levelId+"&DisciplineId="+disciplineId, this.httpOptions)
  }

  updatePresence(presence: Presence): Observable<Presence> {
    return this.http.put<Presence>(this.presencesUrl, presence, this.httpOptions)
      .pipe(
        tap(() => console.log('updatePresence: ' + presence.Id)),
        map(() => presence)

      );
  }

  updateAllPresence(model){
    return this.http.post(this.presencesUrl+ "?courseId=" + model.CourseId + "&disciplineId=" + model.DisciplineId + "&levelId=" + model.LevelId + "&present=" + model.Present, null, this.httpOptions)
  }
}




