import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Surah } from 'src/app/models/surah';

@Injectable({
  providedIn: 'root'
})
export class EvaluationSimpleService {
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

  public getPoeme(){
    return this.http.get("../../../assets/files/moutoun.json");
  }
  changeRecitationDetail(recitationDetailId) {
    this.recitationDetail.next(recitationDetailId);
  }
  changeItem(item) {
    this.item.next(item);

  }
}
