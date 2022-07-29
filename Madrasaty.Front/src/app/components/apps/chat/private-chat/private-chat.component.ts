import { Component, HostBinding, OnInit } from '@angular/core';

import { Member } from 'src/app/models/member';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { MessageService } from 'src/app/services/message/message.service';
//import { SignalrService } from 'src/app/services/signalr.service';



@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss'],
})
export class PrivateChatComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column flex-lg-row';
  membersList:Member[];
  constructor(private membersListService:MembersListService,private messageService:MessageService) {
    //SignalrService.initializeSignalRConnection()

  }
  currentUserId:string;
  ngOnInit() {
    this.membersListService.getMembers().subscribe(response=>{
      this.membersList=response;
      for(const membre of this.membersList){
        membre.FullName=membre.FirstName+' '+membre.LastName;
        //console.log(membre.Id);
    }});
    this.currentUserId=this.membersListService.getCurrentUserId();
    console.log(this.currentUserId);
  }
  public userClick(contactId:string){
this.messageService.setRecieverId(contactId);
    //console.log(this.currentUserId+"\n"+userId);
  }
  // sendMessage(messageBody:string,userId:number,destinationUserId:number){
  //   this.SignalrService.sendMessage(messageBody,userId,destinationUserId);
  // }
}
