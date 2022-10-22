import { MembersListService } from './members/members-list.service';
import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
declare let $: any;
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private isUserLoggedIn;
  currentMemberId
  memberData
  CurrentUser:any;
  userdata: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  constructor( private httpclient:HttpClient, private router:Router) {
  	this.isUserLoggedIn = false;
 
  }

 
  setUserLoggedIn() {
  	this.isUserLoggedIn = true;

  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }

  public getUserToken(loginData){
    this.userdata = "username=" + loginData.email + "&password=" +loginData.password + "&grant_type=password";
    console.log(this.userdata);
    return this.httpclient.post(environment.LOGIN_URL,this.userdata,this.httpOptions);
  }

  logOut() {
    localStorage.removeItem('currentUser');
 
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    this.httpclient.post(environment.ACCOUNT_URL+"Logout",this.httpOptions).subscribe({
      next: respo=>{console.log("DONE Logout")},
      error:err=> console.log("Error Logout")
    })
  }


getMemberStatutId()
{
   this.CurrentUser = JSON.parse(localStorage.getItem("currentUser"))["user"];
   return JSON.parse(this.CurrentUser).MemberStatusId;
}


getMemberSchoolId()
{
   this.CurrentUser = JSON.parse(localStorage.getItem("currentUser"))["user"];
   return JSON.parse(this.CurrentUser).schoolId;
}



}
