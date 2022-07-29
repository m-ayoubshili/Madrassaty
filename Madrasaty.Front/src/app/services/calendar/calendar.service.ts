import { Injectable } from '@angular/core';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { Observable, of, from, forkJoin } from 'rxjs';
import { Examen } from 'src/app/models/examen';
import { environment } from 'src/environments/environment';
import { map, merge } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from 'src/app/models/course';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"]
    })

  };
  examsEvent: CalendarEvent[]=[];
  coursEvent: CalendarEvent[]=[];
  events: any;
  private User = JSON.parse(localStorage.getItem("currentUser"))["user"];
  constructor(private httpclient: HttpClient) { }
  public getEvents()
  {
    // this.getExamensEvent().subscribe(data=>{this.examsEvent=data});
    // this.getCoursEvent().subscribe(data=>{this.coursEvent=data});
    // let mergedEvents =  merge(this.examsEvent,this.coursEvent);
    // this.examsEvent.concat(this.coursEvent);
    // this.events= mergedEvents;
    // return Observable.from(this.examsEvent);
  }
  public getExamensEvent(): Observable<CalendarEvent[]> {
    return this.httpclient.get<Examen[]>(environment.BASE_URL +"Examen?userName="+JSON.parse(this.User).UserName, this.httpOptions).pipe(
      map((data: Examen[]) => data.map((item: Examen) => {
        const model = new CalendarEvent();
        Object.assign(model, item);
        model.title = item.Wording;
        model.date = item.StartDate.toString();
        model.start = item.StartDate.toString();
        model.end = item.EndDate.toString();
        model.eventType = "examen"
        return model;
      }))
    );
  }
  //#region Get Courses as Events
  public getCoursEvent(): Observable<CalendarEvent[]> {
    return this.httpclient.get<Course[]>(environment.COURSE_URL, this.httpOptions).pipe(
      map((data: Course[]) => data.map((item: Course) => {
        const model = new CalendarEvent();
        Object.assign(model, item);
        model.title = item.Name;
        model.date = item.StartDate.toString();
        model.start = item.StartDate.toString();
        model.end = item.EndTime.toString();
        model.eventType = "course"
        return model;
      }))
    );
  }
  //#endregion
}
