import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { DisciplineLevel } from 'src/app/models/DisciplineLevel';
import { MemberFilter } from 'src/app/models/member-filter';

@Injectable()
export class LevelService {

  private disciplineLevelUrl = environment.DISCIPLINE_LEVEL_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.accessToken
    })
  };

  private levelUrl=environment.Get_Level_Url;
  levelIdSource = new BehaviorSubject<number>(0);
  levelIdData: any;
  constructor(private http: HttpClient) {
    this.levelIdData = this.levelIdSource.asObservable();
  }


  getDisciplineLevels(): Observable<DisciplineLevel[]> {
    return this.http.get<DisciplineLevel[]>(this.disciplineLevelUrl, this.httpOptions)
  }

  getLevelsByDiscipline(id: number): Observable<DisciplineLevel[]> {
    return this.http.get<DisciplineLevel[]>(this.disciplineLevelUrl + id, this.httpOptions)
  }

  createDisciplineLevel(disciplineLevel: DisciplineLevel): Observable<DisciplineLevel> {
    return this.http.post<DisciplineLevel>(this.disciplineLevelUrl, disciplineLevel, this.httpOptions)
      .pipe(
        tap(data => console.log('createDisciplineLevel: ' + JSON.stringify(data)),
          error => console.log(error)
        ),
      );
  }
  DisciplineLevelById(id:number){
    if (id === -1) {
      return of(this.initializeDisciplineLevel());
    }
    return this.http.get<DisciplineLevel>(this.levelUrl + id,this.httpOptions)
  }

  deleteDisciplineLevel(id: number): Observable<DisciplineLevel> {
    return this.http.delete<DisciplineLevel>(this.disciplineLevelUrl + id, this.httpOptions)
      .pipe(
        tap(data => console.log('deleteDisciplineLevel: ' + id),
          error => console.log(error))
      );
  }
  updateLevel(level: DisciplineLevel): Observable<DisciplineLevel> {

    return this.http.put<DisciplineLevel>(environment.DISCIPLINE_LEVEL_URL + level.Id,level, this.httpOptions)

  }

  changeLevelId(levelId: number) {
    this.levelIdSource.next(levelId);
  }

  private initializeDisciplineLevel(): DisciplineLevel {
    return {
      Id:0,
      DisciplineId:null,
      Wording:"",
      Description:""
    };
  }

  AssignLevelStudent(id: number, model: MemberFilter[]) {
    return this.http.put(this.disciplineLevelUrl+"Students/" + id, model, this.httpOptions);
  }
}
