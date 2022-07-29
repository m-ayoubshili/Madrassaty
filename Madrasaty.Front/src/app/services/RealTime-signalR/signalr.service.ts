import { Injectable } from '@angular/core';
import { MembersListService } from '../members/members-list.service';
import { MemberConnectionId } from 'src/app/models/memberConnectionId';
import { MemberConnectionIdService } from './member-connectionId.service';
import { Message } from 'src/app/models/message';
import { MessageGroupService } from '../messageGroup/messageGroup.service';
import { MessageGroup } from 'src/app/models/messageGroup';
import { Subject } from 'rxjs';

declare var jQuery:any;
declare var $:any;
@Injectable()
export class SignalrService {
  private messageRecievedSource=new Subject<Message>();
messageRecieved$=this.messageRecievedSource.asObservable();
  private connection: any;
  private mapping:MemberConnectionId=new MemberConnectionId();
  private proxy: any;
  private groups:MessageGroup[];
currentId:string;
constructor(private memberService:MembersListService, private memberConnIdService:MemberConnectionIdService,private groupService:MessageGroupService) {
  this.currentId=memberService.getCurrentUserId();
}
public initializeSignalRConnection(): void {
  let signalRServerEndPoint = "http://localhost:58232/chat";
        this.connection = $.hubConnection(signalRServerEndPoint);
        this.proxy = this.connection.createHubProxy('HubConfig');
  this.proxy.on('EstablishedConnection', () =>this.mapConnIdUId());
  this.proxy.on('MessageRecived',(msg:Message)=>this.messageRecievedSource.next(msg));
  this.proxy.on('MessageRecivedGroup',(msg:Message)=>this.messageRecievedSource.next(msg));
  this.connection.start().done()
      }

private mapConnIdUId(){
  let x=null;
  this.mapping.ConnectionId=this.connection.id;
  this.mapping.MemberId=this.currentId;
  this.memberConnIdService.getByUserId(this.currentId).subscribe({
    next:(response)=>{x=response},
    error:(err)=>{if(err.status==404){this.memberConnIdService.createMapping(this.mapping).subscribe()}},
    complete:()=>{this.memberConnIdService.updateMapping(this.mapping).subscribe({complete:()=>this.joinGroups(this.currentId)})
  },
  });

}
public joinGroups(Id:string){

  this.memberConnIdService.getByUserId(Id).subscribe(
    y=>this.groupService.getGroupsByUserId(Id).subscribe(x=>{this.groups=x;
    this.groups.forEach(group=>{
      this.proxy.invoke('JoinGroup',group.MessageGroupId,y.ConnectionId)
    });}));
}
public removeFromGroup(UID:string,GID:string){
  this.memberConnIdService.getByUserId(UID).subscribe(res=>this.proxy.invoke('LeaveGroup',GID,res.ConnectionId))
}
public sendMessage(msg:Message ){
 if(msg.ToGroup==true){
  this.proxy.invoke('DeliverToGroup',msg,msg.ReceiverId);
 }else{
  let uid=msg.ReceiverId;
  let x:MemberConnectionId;
  this.memberConnIdService.getByUserId(uid).subscribe({
    next:response=>x=response,
    complete:()=>this.proxy.invoke('DeliverMessage',msg,x.ConnectionId)
  })
 }
}

}
