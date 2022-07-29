import { Injectable } from '@angular/core';
import { RecitationDetail } from 'src/app/models/recitation-detail';
import { Observable ,  of ,  BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EvaluationsEtudiantService {
  recitationId;
  studentId;
  private studentRecitationDetailUrl = environment.STUDENT_RECITATION_DETAIL_URL;
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  'bearer ' + this.accessToken
    })
  };

  evalIdSource = new  BehaviorSubject<number>(0);
  evalIdData: any;
  constructor(private http: HttpClient) {
    this.evalIdData= this.evalIdSource.asObservable();
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token'];
  }

  getEvaluations(studentId): Observable<RecitationDetail[]> {
    return this.http.get<RecitationDetail[]>
    (this.studentRecitationDetailUrl + studentId, this.httpOptions)
  }


  getSurahs(){
    return this.http.get<string>(environment.QURAN_URL).map((data) => data["data"])
  }
  public getPoemes(){
    return this.http.get("../../../assets/files/moutoun.json");
  }
  public getPoemesList():Observable<{name:string,number:number}[]>{
    return this.http.get<{name:string,number:number}[]>("../../../assets/files/moutoun.json");
  }
}
