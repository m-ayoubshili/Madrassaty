import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Message } from "src/app/models/message";
import { environment } from "src/environments/environment";

@Injectable()
export class MessageService{
private messagesUrl=environment.BASE_URL+"Messages/";
private contactClickedSource=new Subject<string>();
contactClicked$=this.contactClickedSource.asObservable();

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentUser"))["access_token"]
  })};
  constructor(private httpclient:HttpClient){

  }
getMessageById(id):Observable<Message>{
  return this.httpclient.get<Message>(this.messagesUrl+"Message"+id,this.httpOptions);
}
getAllMessages():Observable<Message[]>{
  return this.httpclient.get<Message[]>(this.messagesUrl+"All",this.httpOptions);
}
getPrivateConversation(firstUserId:string,secondUserId:string):Observable<Message[]>{
  return this.httpclient.get<Message[]>
  (this.messagesUrl+"PrivateConversation?firstUserId="+firstUserId+
  "&secondUserId="+secondUserId,this.httpOptions);
}
getGroupConversation(groupId:number):Observable<Message[]>{
  return this.httpclient.get<Message[]>(this.messagesUrl+"GroupConversation/"+groupId,this.httpOptions);
}
createMessage(message):Observable<Message>{
  return this.httpclient.post<Message>(environment.BASE_URL+"Message",message,this.httpOptions);
}
GetMsgPhotoPath(photo: string) {
  var photoPath = environment.MESSAGE_PHOTO_PATH;
  if (photo != "" && photo != null && photo!="0.jpg"  && photo!="0") {
    photoPath = photoPath + photo + '?' + new Date().getTime();
  }else{
    photoPath=null;
  }
  return photoPath;
}
setRecieverId(recieverId: string) {
  this.contactClickedSource.next(recieverId);
  //console.log(recieverId);
}
}
