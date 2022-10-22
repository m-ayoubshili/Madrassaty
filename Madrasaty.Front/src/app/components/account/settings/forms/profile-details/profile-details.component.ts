import { AccountComponent } from './../../../account.component';
import { ChangeDetectorRef, Component, Host, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit {
  profileForm:FormGroup;
  genderOptions:any;
  countries: any;
  currentMemberId: any;
  profile: Member;
  activeProfile:boolean;
  profileStatus:string;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  PhotoPath: string|ArrayBuffer;
  private unsubscribe: Subscription[] = [];
  errorMessage: any;
  UpPhoto:any;
  currentMemberStatutId

  parent :AccountComponent

  @Input() ExpectedProp:Member;
   _parent: AccountComponent = this._injector.get<AccountComponent>(AccountComponent); 
  constructor(private _injector: Injector , public userService: UserService,private cdr: ChangeDetectorRef,private formBuilder:FormBuilder,private memberService: MembersListService,private Userservice: UserService) {
 
  

    
  }

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      LastName:['', Validators.required],
      FirstName:['', Validators.required],
      Gender:['', Validators.required],
      SkypeId:['', Validators.required],
      ParentEmail:['',],
      PhoneNumber:'',
      BeginningDate:['', Validators.required],
      BirthDate:['', Validators.required],
      Profession:['', Validators.required],
      Street:['', Validators.required],
      ZipCode:['', Validators.required],
      City:['', Validators.required],
      Country:['', Validators.required],
      PhotoBytes:'',
      });
      this.genderOptions=[{ id: 'M', name: 'Masculin' }, { id: 'F', name: 'Féminin' }];
      this.memberService.getCountries().subscribe(
        (countriesData)=>this.countries=countriesData,
        (error)=>console.log(error)
        );
       this.currentMemberId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id']
  
       this.currentMemberStatutId=this.Userservice.getMemberStatutId();
      
       console.log( "sett"+this.ExpectedProp.Email)
       this.displayProfile(this.ExpectedProp)
  }

  onChange(file : File)
  {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.UpPhoto = reader.result;
        this.PhotoPath=this.UpPhoto;
      };
    
    }
  }

  displayProfile(member: any): void {
    if (this.profileForm) {
      this.profileForm.reset();
    }  
    this.profile = member;
    this.activeProfile=(this.profile.MemberStatusId==2||this.profile.MemberStatusId==4)?true:false;
   this.memberService.getMemberStatusById(this.profile.MemberStatusId).subscribe(status=>{
     this.profileStatus=status.Wording
   })
   
    this.profileForm.patchValue({
      LastName: this.profile.LastName,
      FirstName: this.profile.FirstName,
      Gender: this.profile.Gender,
      SkypeId: this.profile.SkypeId,
      PhoneNumber: this.profile.PhoneNumber,
      BeginningDate: new Date(this.profile.BeginningDate+"Z"),
      BirthDate: new Date(this.profile.BirthDate+"Z"),
      Profession: this.profile.Profession,
      Street: this.profile.Street,
      ZipCode: this.profile.ZipCode,
      City: this.profile.City,
      Country: this.profile.Country    
    });   
      this.PhotoPath= this.memberService.GetMemberPhotoPath(this.profile.PhotoPath)
  }


  updateProfile()
  {
    console.log(this.profileForm.value)
    if (this.profileForm.valid) {
      //if (this.profileForm.dirty) {
        const currentProfile = { ...this.profile, ...this.profileForm.value };
        
        if(this.UpPhoto!=null && this.UpPhoto!=undefined)
        {
        currentProfile.PhotoBytes=this.UpPhoto; 
        var array =  currentProfile.PhotoBytes.split(",", 3);
        currentProfile.PhotoBytes=array[1];
        }
        let profileModel = {
          Member: currentProfile,
          Password :  this.profile.Password,
          PhotoBytes:currentProfile.PhotoBytes
        }
        this.memberService.updateProfile(profileModel)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err,
    
        });
      
    
   
      
   
    }
  }

  onSaveComplete(): void {

    swal({
      position: 'top',
      type:"success",
      title: 'Profile modifé avec succès',
      showConfirmButton: false,
      timer: 2000,
      toast:true
    })
    
}


  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
