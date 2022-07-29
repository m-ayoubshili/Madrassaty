import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../components/i18n';
//import { AuthService, UserType } from '../../../../../../components/auth';
import { UserService } from 'src/app/services/user.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { SchoolyearService } from 'src/app/services/schoolyear/schoolyear.service';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  currentUserId: any;
  PhotoPath: string;
  FullName: string;
  Profession: string;
  currentMemberStatutId: number;
  anneeScolaireDescription: string;

  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';


  //user$: Observable<UserType>;

  private unsubscribe: Subscription[] = [];

  constructor(

    private translationService: TranslationService,
     private userService: UserService,
     private memberService: MembersListService,
     private schoolYearService: SchoolyearService

  ) {


    this.currentUserId = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];
  this.memberService.getMember(this.currentUserId)
  .subscribe({
    next: (member: Member) => {
      this.PhotoPath = this.memberService.GetMemberPhotoPath(member.PhotoPath),
        this.FullName = member.FirstName + ' ' + member.LastName,
        console.log(this.FullName);
        this.Profession = member.Profession
    },
    error: err => console.log(err)
  });

  //pour la recuperation de l'année scolaire
  this.schoolYearService.getActifSchoolYear().subscribe({
    next: (resp) => this.anneeScolaireDescription = resp.description,
    error: (err) => console.log("erreur")

  }

  );
  console.log(this.anneeScolaireDescription);
  }

  ngOnInit(): void {
    //this.user$ = this.auth.currentUserSubject.asObservable();



  }
 ngAfterViewInit() {

  }

  logout() {
   /* this.auth.logout();
    document.location.reload();*/
    this.userService.logOut();
  }



 getSchoolYear(){
  this.schoolYearService.getActifSchoolYear().subscribe({
    next: (resp) => this.anneeScolaireDescription = resp.description,
    error: (err) => console.log("erreur")

  }

  );
  console.log("this.anneeScolaireDescription");
 }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}





