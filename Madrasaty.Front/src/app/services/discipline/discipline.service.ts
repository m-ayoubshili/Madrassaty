import { Injectable } from '@angular/core';
import { Discipline } from 'src/app/models/discipline';
import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@Injectable()
export class DisciplineService {

  private disciplineUrl = environment.DISCIPLINE_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };

  disciplineIdSource = new  BehaviorSubject<number>(0);
  disciplineIdData: any;
  constructor(private http: HttpClient) {
    this.disciplineIdData= this.disciplineIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }

  getDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(this.disciplineUrl,this.httpOptions)
  }
  getDiscipline(id): Observable<Discipline> {
    if (id === -1) {
      return of(this.initializeDiscipline());
    }
    return this.http.get<Discipline>(this.disciplineUrl+id,this.httpOptions)
  }
 

  createDiscipline(discipline: Discipline): Observable<Discipline> {

    return this.http.post<Discipline>(this.disciplineUrl, discipline,this.httpOptions)
      .pipe(
        tap(data => console.log('createDiscipline: ' + JSON.stringify(data)),
        error=> console.log(error)
        ),
      );
  }
  updateDiscipline(discipline: Discipline): Observable<Discipline> {
    return this.http.put<Discipline>(this.disciplineUrl+discipline.Id, discipline, this.httpOptions)
      .pipe(
        tap(() => console.log('updateDiscipline: ' + discipline.Id)),
        map(() => discipline)
      );
  }
  deleteDiscipline(id:number): Observable<Discipline> {
    return this.http.delete<Discipline>(this.disciplineUrl+id, this.httpOptions)
      .pipe(
        tap(data => console.log('deleteDiscipline: ' + id),
            error=> console.log(error))
      );
  }
  changeDisciplineId(disciplineId: number){
    this.disciplineIdSource.next(disciplineId);
}
  private initializeDiscipline(): Discipline {
    return {
      Id: 0,
      Wording:null,
      Description:null,
      CreatedOn:null
    };
  }

}
