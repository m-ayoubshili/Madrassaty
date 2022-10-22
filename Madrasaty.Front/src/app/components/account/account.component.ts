import { Member } from './../../models/member';
import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  currentMemberId: any;
  memberData=new Member()
  PhotoPath
  src
  
  constructor(public memberService: MembersListService) {  
    this.currentMemberId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id']; 
  }

  ngOnInit(): void {
   this.getMember() 
   this.memberService.Refreshrequired.subscribe(respone=>{
    this.getMember() 
  }); 
  }
   getMember() {
    this.memberService.getMember(this.currentMemberId)
    .subscribe(data=>{      
     this.memberData=data;   
     this.src=this.memberService.GetMemberPhotoPath(this.memberData.PhotoPath)
    });
  } 

}
