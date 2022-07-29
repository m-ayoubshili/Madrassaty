import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Examen } from "src/app/models/examen";
import { environment } from "src/environments/environment";
import { Discipline } from "src/app/models/discipline";
import { DatePipe } from "@angular/common";
// import { map } from 'rxjs/operator/map';
import { catchError, tap, map } from "rxjs/operators";
import { Examennotes } from "src/app/models/examennotes";
import { CalendarEvent } from "src/app/models/calendar-event";
@Injectable()
export class ExamensService {
  private accessToken = JSON.parse(localStorage.getItem("currentUser"))[
    "access_token"
  ];
  private User = JSON.parse(localStorage.getItem("currentUser"))["user"];
  public MemberStatusId = JSON.parse(this.User).MemberStatusId;
  public MemberUsername = JSON.parse(this.User).UserName;
  aux;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        JSON.parse(localStorage.getItem("currentUser"))["access_token"],
    }),
  };
  examenIdSource = new BehaviorSubject<number>(0);
  examenIdData: any;
  currentUser: Examen;

  constructor(private httpclient: HttpClient, private datePipe: DatePipe) {
    this.examenIdData = this.examenIdSource.asObservable();
  }
  public getMembers() {
    return this.httpclient.get(
      environment.BASE_URL + "Members/Teachers",
      this.httpOptions
    );
  }
  public getExamens(userName: string): Observable<Examen[]> {
    return this.httpclient.get<Examen[]>(
      environment.BASE_URL + "Examen?userName=" + userName,
      this.httpOptions
    );
  }
  changeExamenId(examenId: number) {
    this.examenIdSource.next(examenId);
  }
  getExamen(id): Observable<Examen> {
    if (id === -1) {
      return of(this.initializeExamen());
    }
    return this.httpclient.get<Examen>(
      environment.BASE_URL + "Examen/" + id,
      this.httpOptions
    );
  }
  private initializeExamen(): Examen {
    return {
      Id: 0,
      Wording: "",
      StartDate: new Date(),
      EndDate: null,
      Note: 0,
      DisciplineLevelId: 0,
      DisciplineId: 0,
      TeacherId: 0,
      BeginTime: null,
      EndTime: null,
      Teacher: "",
      Discipline: "",
      DisciplineLevel: "",
      SchoolYearPeriodicityId: 0,
      Periodicity: "",
      SubjectId: 0,
      Subject: "",
      Coefficient: 0,
    };
  }
  getLevelsByDiscipline(id) {
    return this.httpclient.get<Examen>(
      environment.BASE_URL + "DisciplineLevels/" + id,
      this.httpOptions
    );
  }
  getDisciplines() {
    return this.httpclient.get<Discipline>(
      environment.BASE_URL + "Disciplines",
      this.httpOptions
    );
  }
  createExamen(examen: Examen): Observable<Examen> {
    examen.EndDate = examen.StartDate;
    return this.httpclient.post<Examen>(
      environment.BASE_URL + "Examen/"+this.MemberUsername,
      examen,
      this.httpOptions
    );
  }
  updateExamen(examen: Examen): Observable<Examen> {
    return this.httpclient.put<Examen>(
      environment.BASE_URL + "Examen/" + examen.Id,
      examen,
      this.httpOptions
    );
  }

  deleteExamen(id: number): Observable<Examen> {
    return this.httpclient.delete<Examen>(
      environment.BASE_URL + "Examen/" + id,
      this.httpOptions
    );
  }

  getNotesExamen(examen: Examen): Observable<Examennotes[]> {
    return this.httpclient.get<Examennotes[]>(
      environment.BASE_URL +
        "ExamenNotes/" +
        "?examenId=" +
        examen.Id +
        "&DisciplineId=" +
        examen.DisciplineId +
        "&levelId=" +
        examen.DisciplineLevelId,
      this.httpOptions
    );
  }

  getExamenById(id: number): Observable<Examen> {
    return this.httpclient.get<Examen>(
      environment.BASE_URL + "Examen/" + id,
      this.httpOptions
    );
  }
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return Error(errorMessage);
  }

  updateNoteExamen = function (model) {
    return this.httpclient.put(
      environment.BASE_URL + "ExamenNotes/",
      model,
      this.httpOptions
    );
  };
}
