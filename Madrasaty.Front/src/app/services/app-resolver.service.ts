
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MembersListService } from './members/members-list.service';

@Injectable({
  providedIn: 'root'
})
export class AppResolverService implements Resolve<any> {

  
  currentMemberId
  connectedMember
  
  constructor(public memberService: MembersListService) {  
  
    this.currentMemberId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id']; 
  
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> | Promise<any> | any {

    this.connectedMember=this.memberService.getMember(this.currentMemberId)
   return this.memberService.getMember(this.currentMemberId) 
 
  }




}
