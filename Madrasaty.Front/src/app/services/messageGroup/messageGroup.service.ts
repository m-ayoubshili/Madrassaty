import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Member } from "src/app/models/member";
import { MessageGroup } from "src/app/models/messageGroup";
import { environment } from "src/environments/environment";

@Injectable()
export class MessageGroupService{
private messageGroupUrl=environment.BASE_URL+"MessageGroup/";

private groupClickedSource=new Subject<number>();
groupClicked$=this.groupClickedSource.asObservable();


httpOptions={

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"]
  })
};
constructor(private httpclient:HttpClient){}
getAllGroups():Observable<MessageGroup[]>{
  return this.httpclient.get<MessageGroup[]>(this.messageGroupUrl+"Groups",this.httpOptions);
}
getGroupById(groupId:string):Observable<MessageGroup>{
  return this.httpclient.get<MessageGroup>(this.messageGroupUrl+"Groups/"+groupId,this.httpOptions);
}
createGroup(group:MessageGroup):Observable<MessageGroup>{
  return this.httpclient.post<MessageGroup>(this.messageGroupUrl,group,this.httpOptions);
}
getGroupsByUserId(userId:string):Observable<MessageGroup[]>{
  return this.httpclient.get<MessageGroup[]>(this.messageGroupUrl+"Groups/User/"+userId,this.httpOptions);
}
deleteGroupById(groupId:string):Observable<MessageGroup>{
return this.httpclient.delete<MessageGroup>(this.messageGroupUrl+"Groups/"+groupId,this.httpOptions);
}
addUserToGroup(groupId:string,userId:string):Observable<any>{
  return this.httpclient.post(this.messageGroupUrl+"Groups?groupId="+groupId+"&userId="+userId,this.httpOptions);
}
deleteUserFromGroup(groupId:string,userId:string):Observable<any>{
  return this.httpclient.delete(this.messageGroupUrl+"Groups?groupId="+groupId+"&userId="+userId,this.httpOptions);
}
getGroupMembers(groupId:number){
  return this.httpclient.get<Member[]>(this.messageGroupUrl+"Groups/"+groupId+"/Members",this.httpOptions);
}

updateGroup(group:MessageGroup):Observable<MessageGroup>{
  return this.httpclient.put<MessageGroup>(this.messageGroupUrl,group,this.httpOptions);
}
setRecieverId(recieverId: number) {
  this.groupClickedSource.next(recieverId);
  //console.log(recieverId);
}
}
