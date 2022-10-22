import { MemberStatus } from './../../../../../../models/member-status';
import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../components/i18n';
//import { AuthService, UserType } from '../../../../../../components/auth';
import { UserService } from 'src/app/services/user.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { SchoolyearService } from 'src/app/services/schoolyear/schoolyear.service';
import { Member } from 'src/app/models/member';
import { AppResolverService } from 'src/app/services/app-resolver.service';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  currentUserId: any;
  PhotoPath: string;
  FullName: string;
  FirstName: string;
  LastName: string;
  Profession: string;
  currentMemberStatutId: number;
  anneeScolaireDescription: string;
  status:number

  language: LanguageFlag;
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';


  memberStatusData
  //user$: Observable<UserType>;
  data
  private unsubscribe: Subscription[] = [];
  langs = languages;
  constructor(

    private translationService: TranslationService,
     private userService: UserService,
     private memberService: MembersListService,
     private schoolYearService: SchoolyearService,
 
  ) {

   
  }

  ngOnInit(): void {

  this.currentUserId = JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];
   this.getmemeber()
   this.memberService.Refreshrequired.subscribe(respone=>{
 
    this.getmemeber()
  }); 

this.getSchoolYear()

this.schoolYearService.Refreshrequired.subscribe(respone=>{
  this.getSchoolYear()
}); 


  }


  logout() { 
    this.userService.logOut();
  }


getmemeber(){
  this.memberService.getMember(this.currentUserId).subscribe((member)=>
   {
     this.data=member
      this.PhotoPath = this.memberService.GetMemberPhotoPath(this.data.PhotoPath),  
        this.FirstName= member.FirstName 
        this.LastName= member.LastName 
        this.Profession = member.Profession
        this.status=member.MemberStatusId
        this.memberService.getMemberStatusById(this.status).subscribe((memberStatusData) =>{
          this.memberStatusData = memberStatusData;
        } )
    },

  );
}




 getSchoolYear(){
  this.schoolYearService.getActifSchoolYear().subscribe({
    next: (resp) => this.anneeScolaireDescription = resp.description,
    error: (err) => console.log("erreur")  }

  );
 
 }
 selectLanguage(lang: string) {
  this.translationService.setLanguage(lang);
  this.setLanguage(lang);
  // document.location.reload();
}

setLanguage(lang: string) {
  this.langs.forEach((language: LanguageFlag) => {
    if (language.lang === lang) {
      language.active = true;
      this.language = language;
    } else {
      language.active = false;
    }
  });
}
 

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
];





