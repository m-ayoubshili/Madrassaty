import { Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Member } from "src/app/models/member";
import { tap } from "rxjs/operators";
//import { map } from "rxjs-compat/operator/map";

@Injectable()
export class RegisterService {
  memberdata: string;
  listAdmins: string[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "",
    }),
  };
  http: any;

  constructor(private httpclient: HttpClient) {}
  public getCountries() {
    return this.httpclient.get("../../assets/files/countries.json");
  }
  public getSchools() {
    return this.httpclient.get(environment.BASE_URL + "Schools");
  }
  public getMemberStatus() {
    return this.httpclient.get(environment.BASE_URL + "MemberStatus");
  }

  public getAdmins(id) {
    return this.httpclient.get<string[]>(
      environment.BASE_URL + "Members/GetMembersBySchoolId/" + id,
      this.httpOptions
    );
  }

  public RegisterUser(formData) {
    formData.login = formData.email;
    formData.PhotoPath = "Unknown.jpg";
    console.log(formData)
    return this.httpclient.post(
      environment.BASE_URL + "Account/RegisterMember",
      formData,
      this.httpOptions
    );
  }

  SetPassword(passwordmodel) {
    return this.httpclient.post(
      environment.BASE_URL + "Account/PasswordRecovery",
      passwordmodel,
      this.httpOptions
    );
  }

  ChangePassword(passwordmodel) {
    return this.httpclient.put(
      environment.BASE_URL + "Members/PutMemberLogins",
      passwordmodel,
      this.httpOptions
    );
  }
  editPassword(aux): Observable<Member> {
    let MemberModel = {
      Password: aux.Password,
      Id: aux.Id,
    };
    return this.httpclient
      .put<Member>(environment.BASE_URL + "Members/PutMemberLogins", MemberModel )
      .pipe(tap(() => console.log("updateMember: ")));
  }
}
