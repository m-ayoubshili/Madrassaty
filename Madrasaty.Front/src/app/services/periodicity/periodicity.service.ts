import { Injectable } from '@angular/core';
import { Periodicity } from 'src/app/models/periodicity';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SchoolyearService } from '../schoolyear/schoolyear.service';
import { SchoolYear } from 'src/app/models/schoolyear';

@Injectable({
  providedIn: 'root'
})
export class PeriodicityService {
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  actifSchoolYear: SchoolYear;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.accessToken
    })
  };
  constructor(private http: HttpClient, private schoolYearService: SchoolyearService) { }


  getPeriodicitiesBySchoolYear(id: number) {
    return this.http.get<Periodicity[]>(environment.PERIODICITY_URL + id, this.httpOptions)
  }

  getPeriodicitiesByActifSchoolYear()
  {
    return this.http.get<Periodicity[]>(environment.PERIODICITY_URL+"Actif", this.httpOptions)
  }
  createPeriodicity(periodicity: Periodicity): Observable<Periodicity> {
    return this.http.post<Periodicity>(environment.PERIODICITY_URL, periodicity, this.httpOptions)
  }
  deletePeriodicity(id: number): Observable<Periodicity> {
    return this.http.delete<Periodicity>(environment.PERIODICITY_URL + id, this.httpOptions)
  }

}
