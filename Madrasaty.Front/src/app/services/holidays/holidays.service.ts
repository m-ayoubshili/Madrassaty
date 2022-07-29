import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Holiday } from 'src/app/models/holiday';
import { DatePipe } from '@angular/common';
@Injectable()
export class HolidaysService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"]
    })
  };
  holidayIdSource = new BehaviorSubject<number>(0);
  holidayIdData: any;
  constructor(private httpclient: HttpClient, private datePipe: DatePipe) {
    this.holidayIdData = this.holidayIdSource.asObservable();
  }
  public getHolidays() {
    return this.httpclient.get(environment.BASE_URL + "VacanceScolaire", this.httpOptions);
  }
  changeHolidayId(holiayId: number) {
    this.holidayIdSource.next(holiayId);
  }
  getHoliday(id:number): Observable<Holiday> {
    if (id === -1) {
      return of(this.initializeHoliday());
    }
    console.log("the id is "+id);
    return this.httpclient.get<Holiday>(environment.BASE_URL + "VacanceScolaire/"+id, this.httpOptions)
  }
  private initializeHoliday(): Holiday {
    return {
      Id: 0,
      StartDay: new Date(),
      EndDay: new Date(),
      description: ''
    };
  }
  createHoliday(holiday: Holiday): Observable<Holiday> {
    return this.httpclient.post<Holiday>(environment.BASE_URL + "VacanceScolaire", holiday, this.httpOptions)
  }
  updateHoliday(holiday: Holiday): Observable<Holiday> {
    return this.httpclient.put<Holiday>(environment.BASE_URL + "VacanceScolaire/" + holiday.Id, holiday, this.httpOptions)
  }
  GetAnneeScolaireActif() {
    return this.httpclient.get(environment.BASE_URL + "AnneeScolaires/Actif", this.httpOptions);
  }

  deleteHoliday(id: number): Observable<Holiday> {
    return this.httpclient.delete<Holiday>(environment.BASE_URL + "VacanceScolaire/" + id, this.httpOptions)
  }
}
