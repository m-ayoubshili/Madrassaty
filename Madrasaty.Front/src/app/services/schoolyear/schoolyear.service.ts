import { Injectable } from '@angular/core';
import { Observable ,  of ,  BehaviorSubject, Subject } from 'rxjs';
import { SchoolYear } from 'src/app/models/schoolyear';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap ,  map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable()
export class SchoolyearService {
  private schoolYearUrl = environment.SCHOOLYEAR_URL;
  schoolYearIdSource = new  BehaviorSubject<number>(0);
  schoolYearIdData:any;
  private _refreshrequired = new Subject<void>();
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };
  constructor(private http: HttpClient, private datePipe:DatePipe) {
    this.schoolYearIdData= this.schoolYearIdSource.asObservable();
  }

  get Refreshrequired() {
    return this._refreshrequired;
  }
  getSchoolYears(): Observable<SchoolYear[]> {
    return this.http.get<SchoolYear[]>(this.schoolYearUrl,this.httpOptions)
  }
  getSchoolYear(id:number): Observable<SchoolYear> {
    if (id === -1) {
      return of(this.initializeSchoolYear());
    }
    return this.http.get<SchoolYear>(this.schoolYearUrl+id,this.httpOptions)
  }
  getActifSchoolYear(): Observable<SchoolYear> {
    return this.http.get<SchoolYear>(this.schoolYearUrl+"Actif",this.httpOptions)
  }
  initializeSchoolYear(): SchoolYear {
    return {
      Id: 0,
      description:null,
      StartDay:null,
      EndDay:null,
      Actif:false
    };
  }
  createSchoolYear(schoolyear: SchoolYear): Observable<SchoolYear> {
    return this.http.post<SchoolYear>(this.schoolYearUrl, schoolyear,this.httpOptions)
  }

  updateSchoolYear(schoolyear: SchoolYear): Observable<SchoolYear> {
    return this.http.put<SchoolYear>(this.schoolYearUrl+schoolyear.Id, schoolyear, this.httpOptions)
  }

  deleteSchoolYear(id:number): Observable<SchoolYear> {
    return this.http.delete<SchoolYear>(this.schoolYearUrl+id, this.httpOptions)
  }
  UpdateActifAnneeScolaire(id) {
    return this.http.put(this.schoolYearUrl + "UpdateActif?id=" + id, this.httpOptions).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
      );;
}
changeSchoolYearId(Id: number){
  this.schoolYearIdSource.next(Id);
}
getSchoolYearMinDate(id:number)
{
}
getSchoolYearMaxDate()
{

}
}
