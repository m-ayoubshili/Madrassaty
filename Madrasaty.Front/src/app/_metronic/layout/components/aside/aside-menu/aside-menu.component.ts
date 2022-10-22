import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;
  currentUserId:any
  currentMemberStatutId:number
  constructor(private  userService:UserService) {}

  ngOnInit(): void { this.currentMemberStatutId=this.userService.getMemberStatutId();}


  ngAfterViewInit() {
    this.currentUserId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];   

  }
}
