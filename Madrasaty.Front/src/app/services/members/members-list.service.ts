import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { Member } from 'src/app/models/member';
import { catchError, tap, map } from 'rxjs/operators';
import { MemberFilter } from 'src/app/models/member-filter';
import { MemberStatus } from 'src/app/models/member-status';
@Injectable()
export class MembersListService {
  private memberUrl = environment.BASE_URL + "Members";
  private accessToken = JSON.parse(localStorage.getItem('currentUser'))['access_token']
  private User = JSON.parse(localStorage.getItem("currentUser"))["user"];
  private IdUser = JSON.parse(this.User).Id;
  memberData;

  private _refreshrequired = new Subject<void>();


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"]
    })
  };
  memberIdSource = new BehaviorSubject<number>(0);
  http: HttpClient;
  memberIdData: any;
  connectedUserData

  currentUser: Member;

  get Refreshrequired() {
    return this._refreshrequired;
  }
  public getMemberStatus() {
    return this.httpclient.get(environment.BASE_URL + "MemberStatus");
  }
  public getMemberStates() {
    return this.httpclient.get(environment.BASE_URL + "MemberStates");
  }
  constructor(private httpclient: HttpClient) {
    this.memberIdData = this.memberIdSource.asObservable();
  }



  getMembers(): Observable<Member[]> {
    return this.httpclient.get<Member[]>(this.memberUrl, this.httpOptions)
  }
  public getCountries() {
    return this.httpclient.get("../../../assets/files/countries.json");
  }
  createMember(member: Member): Observable<Member> {
    member.Login = member.Login;
    member.PhotoPath = "Unknown.jpg";
    member.UserName = member.Login;
    member.Id = '00000000-0000-0000-0000-000000000000'
    let MemberModel = {
      Member: member,
      Password: member.Password,
      PhotoBytes: ''
    }
    return this.httpclient.post<Member>(environment.BASE_URL + "Members", MemberModel, this.httpOptions)
  }
  GetMemberById() {
    return this.httpclient.get<Member>(environment.BASE_URL + "Members/" + this.IdUser, this.httpOptions)

  }
  getCurrentMember(id): Observable<Member> {
    return (this.httpclient.get<Member>(environment.BASE_URL + "Members/" + id, this.httpOptions));

  }
  public getMemberStatusById(id: number): Observable<MemberStatus> {
    return this.httpclient.get<MemberStatus>(environment.BASE_URL + "MemberStatus/" + id, this.httpOptions);
  }

  updateMember(member: Member): Observable<Member> {
    member.PhotoPath = "Unknown.jpg";
    // member.SchoolId=this.GetSchoolId();
    let MemberModel = {
      Member: member,
      Password: member.Password,
      PhotoBytes: ''
    }
    return this.httpclient.put<Member>(environment.BASE_URL + "Members/" + member.Id, MemberModel, this.httpOptions)
  }


  changeMemberId(memberId: number) {
    this.memberIdSource.next(memberId);
  }
  getMember(id): Observable<Member> {
    if (id === -1) {
      return of(this.initializeMember());
    }
    return this.httpclient.get<Member>(environment.BASE_URL + "Members/" + id, this.httpOptions)
  }
  GetStudents(levelId: number): Observable<MemberFilter[]> {
    return this.httpclient.get<MemberFilter[]>(environment.MEMBER_URL + 'Students/' + levelId, this.httpOptions)
  }
  private initializeMember(): Member {
    return {
      Login: '',
      FirstName: '',
      LastName: '',
      Gender: '',
      SkypeId: '',
      ParentEmail:'',
      PhoneNumber: '',
      BeginningDate: null,
      BirthDate: null,
      Profession: '',
      Street: '',
      ZipCode: '',
      City: '',
      Country: '',
      FullName:'',
      PhotoPath: '',
      Id: '00000000-0000-0000-0000-000000000000',
      Email: '',
      Password: '',
      SchoolId: 0,
      MemberStatusId: 0,
      MemberStateId:1,
      UserName: ''
    };
  }
  deleteMember(id: number): Observable<Member> {
      return this.httpclient.delete<Member>(environment.BASE_URL + "Members/" + id, this.httpOptions)
  }

  GetMemberPhotoPath(photo: string) {
    var photoPath = environment.MEMBER_PHOTO_PATH;
    if (photo != "" && photo != null) {
      photoPath = photoPath + photo + '?' + new Date().getTime();
    }
    else {
      photoPath = photoPath + "unknown.jpg";
    }
    return photoPath;
  }
  updateProfile(profileModel): Observable<Member> {
    return this.httpclient.put<Member>(environment.BASE_URL + "Members/" + profileModel.Member.Id, profileModel, this.httpOptions).pipe(
    tap(() => {
      this.Refreshrequired.next();

    })
    )
  }

  validateProfile(profileModel): Observable<Member> {
    // active profile
    profileModel.MemberStatusId = 4;
    return this.httpclient.put<Member>(environment.BASE_URL + "Members/" + profileModel.Member.Id, profileModel, this.httpOptions)
  }

  MemberById(id): Observable<Member> {
    return this.httpclient.get<Member>(environment.BASE_URL + "Members/" + id, this.httpOptions)
  }



  UploadExcel(formData: FormData) {
    let params = new HttpParams();
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"],});
    const options = {headers: headers,params: params,reportProgress: true};
   return this.httpclient.post(environment.BASE_URL + 'UploadExcel', formData,options)
  }
}
