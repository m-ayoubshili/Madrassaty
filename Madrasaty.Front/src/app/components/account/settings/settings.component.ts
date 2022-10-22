import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
 
  fmemberData
  constructor(private activatedroute:ActivatedRoute) {    
  }

  ngOnInit(): void {  
    this.activatedroute.data.subscribe((result:{res:any})=>{
      this.fmemberData=result.res;  
     }
      )      
  }

  

  

}
