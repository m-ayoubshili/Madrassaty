import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Surah } from 'src/app/models/surah';

@Injectable({
  providedIn: 'root'
})
export class EvaluationDetailleeService {
  recitationDetail = new BehaviorSubject<any>(0);
  item = new BehaviorSubject<any>(0);
  itemData: any;

  recitationDetailData: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+JSON.parse(localStorage.getItem("currentUser"))["access_token"]
          })

  };
  constructor(private http: HttpClient) {
    this.recitationDetailData = this.recitationDetail.asObservable();
    this.itemData = this.item.asObservable();

  }
/*   public getSurahs() {
    return this.http.get("../../assets/files/surahs.json");.map((data) => data["data"])
  } */
   getSurah(): Observable<Surah[]> {

    return this.http.get<Surah[]>(environment.QURAN_URL)
  } 
  getSurahById(number: number): Observable<number> {

    return this.http.get<number>(environment.QURAN_URL + "/" + number).map((data) => data["data"]).map((da) => da.numberOfAyahs)
  }
  getLibelleSurahById(number: number): Observable<string> {

    return this.http.get<string>(environment.QURAN_URL + "/" + number).map((data) => data["data"]).map((da) => da.name+" "+da.englishName)
  }

  createRecitationTajwidErrors(recitationTajwidErrors) {
    return this.http.post(environment.RECITATION_TAJWIDERROR_URL,recitationTajwidErrors,this.httpOptions)

  }

  createLearningError(learningError)
  {
    return this.http.post(environment.LearningError_URL,learningError,this.httpOptions)

  }
  getRecitationTajwidErrors(recitationDetailId:number)
  {
    return this.http.get(environment.RECITATION_TAJWIDERROR_URL+"RecitationDetail/"+recitationDetailId,this.httpOptions)

  }
  deleteLearningError(learningError,recitationDetail)
  {
    return this.http.delete(environment.LearningError_URL+ "?id=" + learningError.id.toString()+ "&recitationDetailId=" +recitationDetail,this.httpOptions)
  }
  changeRecitationDetail(recitationDetailId) {
    this.recitationDetail.next(recitationDetailId);
  }
  changeItem(item) {
    this.item.next(item);

  }

  getExistingLearningErrors(recitationDetailId:number):Observable<any>{
    return this.http.get(environment.LearningError_URL+"RecitationDetail/"+ recitationDetailId,this.httpOptions)
  }

}
