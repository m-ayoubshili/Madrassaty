import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { MessageService } from 'src/app/services/message/message.service';
import { MessageModel } from 'src/app/_metronic/partials/content/chat-inner/dataExample';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnInit{

  @HostBinding('class') class = 'card-body';
  @Input()
  message:MessageModel;
  @Input()
  newPhoto:any
  @Input()
  messageIndex:number;
  user:Member=new Member();
  msgPic:string;
  currentUserPhotoPath:string;
  constructor(private memberService:MembersListService,private messageService:MessageService){
    memberService.GetMemberById().subscribe(response=>this.currentUserPhotoPath=memberService.GetMemberPhotoPath(response.PhotoPath));

  }
  ngOnInit(){
    //console.log("I m working");
    this.memberService.getMember(this.message.user).subscribe(response=>{this.user=response});
    if(this.message.time)
    this.msgPic=this.messageService.GetMsgPhotoPath(this.message.photo);
    else
    this.msgPic=this.newPhoto;
    // this.photoPath=this.memberService.GetMemberPhotoPath(this.user.PhotoPath);
    //this.message.photo=this.memberService.GetMemberPhotoPath(this.user.PhotoPath);
  }
  getMessageCssClass(message: MessageModel): string {
    return `p-5 rounded text-dark fw-bold mw-lg-400px bg-light-${
      message.type === 'in' ? 'info' : 'primary'
    } text-${message.type === 'in' ? 'start' : 'end'}`;
  }
}
