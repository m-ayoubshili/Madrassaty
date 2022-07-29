import { Component, HostBinding, OnInit } from '@angular/core';

import { Member } from 'src/app/models/member';
import { MessageGroup } from 'src/app/models/messageGroup';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { MessageGroupService } from 'src/app/services/messageGroup/messageGroup.service';
import {StudentDisciplineLevelService} from 'src/app/services/student-discipline-level/student-discipline-level.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss'],
})
export class GroupChatComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column flex-lg-row';

  currentUserId:string;
  groupMembers:Member[][]=[];
  groups:MessageGroup[]=[];
  photoPath=environment.MEMBER_PHOTO_PATH+ "unknown.jpg";
  constructor(private membersListService:MembersListService, private groupChatService: MessageGroupService) {
    this.currentUserId=this.membersListService.getCurrentUserId();
    this.groupChatService.getGroupsByUserId(this.currentUserId).subscribe({
      next:response=>{this.groups=response},
      error:console.log,
      complete:()=>{this.groups.forEach(x=>this.groupMembers.push(this.getGroupMembers(x.MessageGroupId)));}
    });
  }

  ngOnInit(): void {

    }
    onGroupClicked(id:any){
      this.groupChatService.setRecieverId(id);
    }
    getGroupMembers(groupId):Member[]{
      var groupMembers:Member[];
      this.groupChatService.getGroupMembers(groupId).subscribe({next:response=>{groupMembers=response},
      error:console.log,
      complete:()=>groupMembers.forEach(x=>console.log(x.FirstName))});
      return groupMembers
    }
}
