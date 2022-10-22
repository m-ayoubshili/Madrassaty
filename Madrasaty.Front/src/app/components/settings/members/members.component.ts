import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  switchbtn: boolean=false;
  DialogTitle: string;
  memberForm: FormGroup;
  countries;

  rowData:any;
  message: string;
  member: Member;
  errorMessage = '';
  mylist: any;
  memberstatut: any;
  memberFormGroup: FormGroup;
  MemberStatusId
  search
  MemberStatesId
  
  states=[{ id: 1, name: 'In progress' }, { id: 2, name: 'Approved' }, { id: 3, name: 'Rejected' }];
  private User = JSON.parse(localStorage.getItem("currentUser"))["user"];
  private IdUser = JSON.parse(this.User).Id;
  private SchoolIdUser = JSON.parse(this.User).schoolId;
  @ViewChild('fileInput') fileInput;
  constructor( private notification: NotificationService,private members: MembersListService,private formBuilder: FormBuilder) {
   }

  ngOnInit(){

    this.memberFormGroup = this.formBuilder.group({
      memberDropDown: ["",[Validators.required]]
    })
    this.memberForm = this.formBuilder.group({
      Email: ["", [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      Id: ["", ],
      Password: ["",],
      LastName: ["", [Validators.required]],
      FirstName: ["", [Validators.required]],
      MemberStatusId: ["", [Validators.required]],
      MemberStateId:["", [Validators.required]],
      SkypeId: ["", [Validators.required]],
      Profession: ["", [Validators.required]],
      BeginningDate: ["", [Validators.required]],
      ZipCode: ["", [Validators.required]],
      Street: ["", [Validators.required]],
      City: ["", [Validators.required]],
      SchoolId: ["", ],
      Gender: ["", [Validators.required]],
      Country: ["", [Validators.required]],
      BirthDate:[ "", [Validators.required]],
      PhotoPath: ["", ],
      PhoneNumber:[ "", [Validators.required]],
      Login: ["", [Validators.required]],
    });

    this.members.getCountries().subscribe(
      (countriesData) => (this.countries = countriesData),
      (error) => console.log(error)
    );

  this.members.getMemberStatus().subscribe((memberStatusData) => this.MemberStatusId = memberStatusData);
  this.members.getMemberStates().subscribe((memberStatesData) => this.MemberStatesId = memberStatesData);

    this.refreshMemberList();

  }

  refreshMemberList() {
    this.members.getMembers().subscribe(
      {
        next: membersData => {  
              
          if (this.memberFormGroup.get('memberDropDown').value != null && this.memberFormGroup.get('memberDropDown').value != "") {
            this.rowData = membersData.filter(x => x.MemberStatusId == this.memberFormGroup.get('memberDropDown').value && x.SchoolId==this.SchoolIdUser)
          }
          else {
            this.rowData = membersData;
            this.mylist = membersData;
              }
        },
        error: err => this.errorMessage = err
      });
      console.log(this.memberFormGroup.get('memberDropDown').value)
  }
  onSelectChange(arg: any) {
    if (arg.source.value != null && arg.source.value != "") {
      this.rowData = this.mylist.filter(x => x.MemberStatusId == arg.source.value && x.SchoolId==this.SchoolIdUser)
    }
    else {
      this.rowData = this.mylist;
        }

  }
  searchResult(data){
    this.search=data
  }

  OpenDiag(id: number) { 
    this.DialogTitle = id == -1 ? "Ajouter Member" : "Modifier Member"
    console.log(id)
     this.members.getMember(id)
      .subscribe({
        next: (member: Member) => this.displayMember(member),
        error: err => console.log(err)
      });
}

displayMember(member: Member): void {
  if (this.memberForm) {
    this.memberForm.reset();
  }

  this.member = member;
  this.memberForm.patchValue({
    Id: member.Id,
    FirstName: member.FirstName,
    LastName: member.LastName,
    Gender: member.Gender,
    SkypeId: member.SkypeId,
    PhoneNumber: member.PhoneNumber,
    BeginningDate: new Date(this.member.BeginningDate + "Z"),
    BirthDate: new Date(this.member.BirthDate + "Z"),
    Profession: member.Profession,
    Street: member.Street,
    ZipCode: member.ZipCode,
    City: member.City,
    Country: member.Country,
    PhotoPath: member.PhotoPath,
    Email: member.Email,
    Password: member.Password,
    SchoolId: member.SchoolId,
    MemberStatusId: member.MemberStatusId,
    MemberStateId: member.MemberStateId,
    Login: member.Login,
  });
}



BeforeSave() 
{
  this.members.getCurrentMember(this.IdUser).subscribe((memberdata) => this.saveMember(memberdata.SchoolId) );
}

saveMember(Id): void {

    if (this.memberForm.valid) {
      if (this.memberForm.dirty) {
          this.memberForm.get("Password").setValue("passer");
        const m = { ...this.member, ...this.memberForm.value };

        m.SchoolId = Id;

        if (m.Id === "00000000-0000-0000-0000-000000000000" || m.Id === "" ||   m.Id === null) {
          this.members.createMember(m).subscribe({
            next: () => this.notification.onSaveComplete('success',"Membre","ajoutée",this.refreshMemberList()),
            error: (err) => (this.errorMessage = err),
          });
        } else {              
          this.members.updateMember(m).subscribe({
            next: () => this.notification.onSaveComplete('success',"Membre","modifié",this.refreshMemberList()),
            error: (err) => (this.errorMessage = err),
          });
        }
      } else {
        console.log("no")      
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";     
    }
}

deleteItem(id: number) {
  this.notification.deleteElementAlert().then((result) => {
    if (result.value) {
      this.members.deleteMember(id)
        .subscribe({
          next: () => { this.refreshMemberList(), this.notification.onSaveComplete('warning',"Membre","supprimée",this.refreshMemberList())},
          error: err => this.errorMessage = err
        });
    }else{this.refreshMemberList()}
  })
}
  uploadFile() {
    let formData = new FormData();
    formData.append('upload', this.fileInput.nativeElement.files[0])
    this.members.UploadExcel(formData).subscribe(result => {
      this.message = result.toString();
      this.refreshMemberList();
    });
  }
    
  getvalue(id){
    return this.states.find(x=>x.id==id).name     
  }

}
