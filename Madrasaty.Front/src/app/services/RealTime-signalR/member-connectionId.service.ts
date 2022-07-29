import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemberConnectionId } from "src/app/models/memberConnectionId";
import { environment } from "src/environments/environment";

@Injectable()
export class MemberConnectionIdService{
  private memberConnectionIdUrl=environment.BASE_URL+"MemberConnectionId/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"]
    })};
    constructor(private httpclient:HttpClient){}
    getAll():Observable<MemberConnectionId[]>{
      return this.httpclient.get<MemberConnectionId[]>(this.memberConnectionIdUrl+"All",this.httpOptions);
    }
    getByUserId(id):Observable<MemberConnectionId>{
      return this.httpclient.get<MemberConnectionId>(this.memberConnectionIdUrl+"UserId/"+id,this.httpOptions);
    }
    createMapping(mapping):Observable<MemberConnectionId>{
      return this.httpclient.post<MemberConnectionId>(this.memberConnectionIdUrl,mapping,this.httpOptions);
    }

    updateMapping(mapping):Observable<MemberConnectionId>{
     return this.httpclient.put<MemberConnectionId>(this.memberConnectionIdUrl,mapping,this.httpOptions);
    }
}
