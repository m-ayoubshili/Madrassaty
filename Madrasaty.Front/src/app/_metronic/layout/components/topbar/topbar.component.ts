import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  currentMemberId;
  memberData=new Member()
  PhotoPath
  src
  
  constructor(private layout: LayoutService,public memberService: MembersListService) {    }

 

  ngOnInit(): void {
    this.currentMemberId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];
    this.headerLeft = this.layout.getProp('header.left') as string;
   this.getMember() 

  }
   getMember() {
    this.memberService.getMember(this.currentMemberId)
    .subscribe(data=>{      
     this.memberData=data;   
    
     this.src=this.memberService.GetMemberPhotoPath(this.memberData.PhotoPath)

    });
  } 

  
}
