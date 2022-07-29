import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TajwidError } from 'src/app/models/tajwid-error';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TajwidErrorService {
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.accessToken
    })
  };

  constructor(private http: HttpClient) { }

  getRootTajwidErrors() {
    return this.http.get(environment.TAJWID_ERROR_URL+"RootItems", this.httpOptions)

  }
  getTajwidErrors_() {
    return this.http.get(environment.TAJWID_ERROR_URL+"All", this.httpOptions)

  }
/*   getTajwidError(Id:number):Observable<TajwidError>{
    if (Id === -1) {
      return of(this.initializeTajwidError());
    }
    return this.http.get<TajwidError>(environment.TAJWID_ERROR_URL+Id, this.httpOptions)

  } */

  public getTajwidErrors(): Observable<any> {
    return this.http.get("../../../../assets/files/TajwidError.json");
  }

  initializeTajwidError(): TajwidError {
    return {
      Id: 0,
     Wording:'',
     ParentId:0,
     children:[]
    };
  }
  updateTajwidErrorLocation(e): Observable<any> {

    let model = {
      'Id': e.item.Id,
      'Wording': e.item.Wording,
      'ParentId': e.item.ParentId,
      'children': e.item.children
    }
    return this.http.put(environment.TAJWID_ERROR_URL+model.Id,model,this.httpOptions)
  }
  updateTajwidError(model): Observable<any> {
    return this.http.put(environment.TAJWID_ERROR_URL+model.Id,model,this.httpOptions)
  }

  deleteTajwidError(Id): Observable<any> {
    return this.http.delete(environment.TAJWID_ERROR_URL+Id,this.httpOptions)
  }
  createTajwidError(e): Observable<any> {

    let model = {
      'Wording': e.Wording,
    }
    return this.http.post(environment.TAJWID_ERROR_URL,model,this.httpOptions)
  }
}
