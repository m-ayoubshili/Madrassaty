import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent, merge, Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import Swal from 'sweetalert2'
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
  selectedCar
  rowData:any;
  message: string;
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  member: Member;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  currentMemberId: any;
  errorMessage = '';
  mylist: any;
  memberstatut: any;
  memberFormGroup: FormGroup;
  MemberStatusList
  MemberStatusId
  selectedUserType
  displayedColumns: string[] = ['Nom', 'Prénom', 'Date de naissance','Profession','Téléphone','Evaluations','Actions'];
  dataSource: MatTableDataSource<any>;
  private User = JSON.parse(localStorage.getItem("currentUser"))["user"];
  private IdUser = JSON.parse(this.User).Id;
  private SchoolIdUser = JSON.parse(this.User).schoolId;

  @ViewChild('fileInput') fileInput;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  displayMessage: { [key: string]: string; };
  constructor(private dialog: MatDialog,private members: MembersListService,private formBuilder: FormBuilder) {
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

    this.members
    .getMemberStatus()
    .subscribe(
      (memberStatusData) => (this.MemberStatusList = memberStatusData)
    );

  this.members.getMemberStatus().subscribe((memberStatusData) => this.MemberStatusId = memberStatusData);

    this.displayMembers();

  }

  ngAfterViewInit() {
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur")
    );
    merge(this.memberForm.valueChanges, ...controlBlurs)
      .pipe()
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.memberForm
        );
      });
    this.getMember();
  }


   getMember(): void {
    this.members.memberIdData.subscribe((data) => {
      this.currentMemberId = data;
      this.members.getMember(this.currentMemberId).subscribe({
        next: (member: Member) => this.displayMembers(),
        error: (err) => console.log(err),
      });
    });
  }



  displayMembers() {
   this.memberstatut = this.memberstatut = this.memberFormGroup.get('memberDropDown').value;
    this.members.getMembers().subscribe(
      {
        next: membersData => {
          console.log(this.SchoolIdUser)
          if (this.memberstatut == null || this.memberstatut == '') {
            this.rowData = membersData.filter(x=>x.SchoolId==this.SchoolIdUser);
            this.dataSource = new MatTableDataSource<any>(this.rowData);
          }
          else {
           // this.rowData = membersData.filter(x => x.MemberStatusId == this.memberstatut);
            this.rowData = membersData.filter(x=>x.SchoolId==this.SchoolIdUser);
            this.dataSource = new MatTableDataSource<any>(this.rowData);
          }

          this.mylist = membersData;
        },
        error: err => this.errorMessage = err
      });
  }
  onSelectChange(arg: any) {
    console.log(arg.source.value, arg.source.selected);

      console.log("aa" + arg.target + this.rowData)
    if (arg.source.value != null && arg.source.value != "") {
      this.rowData = this.mylist.filter(x => x.MemberStatusId == arg.source.value && x.SchoolId==this.SchoolIdUser)
    }
    else {
      this.rowData = this.mylist;

    }

  }


  OpenDiag(id: number) {
    let dialogRef = this.dialog.open(this.callAPIDialog,{panelClass: 'my-custom-dialog-class'});
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
    Login: member.Login,
  });
}



BeforeSave() {
  this.members
    .getCurrentMember(this.IdUser)
  .subscribe((memberdata) =>
 this.saveMember(memberdata.SchoolId)

   );


}

saveMember(Id): void {

    if (this.memberForm.valid) {
      if (this.memberForm.dirty) {
          this.memberForm.get("Password").setValue("passer");
        const m = { ...this.member, ...this.memberForm.value };

        m.SchoolId = Id;

        if (m.Id === "00000000-0000-0000-0000-000000000000" || m.Id === "" ||   m.Id === null) {
          console.log("ko")
          this.members.createMember(m).subscribe({
            next: () => this.onSaveComplete("ajouté"),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          console.log("hi")
          this.members.updateMember(m).subscribe({
            next: () => this.onSaveComplete("modifié"),
            error: (err) => (this.errorMessage = err),
          });
        }
      } else {
        this.onSaveComplete("");
        console.log("bad");
      }


    } else {
      this.errorMessage = "Please correct the validation errors.";
      console.log("bad form");
    }




}

onSaveComplete(msg: string) {
  this.memberForm.reset();

  if (msg != "") {
    Swal({
      position: "top",
      type: "success",
      title: "Membre " + msg + " avec succès",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
    });
  }
  this.displayMembers()

}


deleteItem(id: number) {
  this.deleteElementAlert().then((result) => {
    if (result.value) {
      this.members.deleteMember(id)
        .subscribe({
          next: () => { this.displayMembers(), this.afterDelete() },
          error: err => this.errorMessage = err
        });

    }
  })
}

deleteElementAlert() {
  return Swal({
    title: 'Etes-vous sûr de vouloir supprimer cet élément?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmer',
    type: 'warning',
    cancelButtonText: 'Annuler',
  })
}
refreshMemberList() {
  this.members.getMembers().subscribe({
    next: membersData => {
      this.rowData = membersData;
    },
    error: err => this.errorMessage = err
  });
}
afterDelete() {
  Swal({
    position: 'top',
    type: "success",
    title: 'Membre supprimé avec succès',
    showConfirmButton: false,
    timer: 2000,
    toast: true
  });
}
  switchToCard(){
    this.switchbtn = !(this.switchbtn);
  }



  uploadFile() {
    let formData = new FormData();
    formData.append('upload', this.fileInput.nativeElement.files[0])

    this.members.UploadExcel(formData).subscribe(result => {
      this.message = result.toString();
      this.refreshMemberList();
    });

  }

}
