import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/services/school/school.service';
import Swal from 'sweetalert2'
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
})
export class SchoolComponent implements OnInit {

  currentSchoolId: number;
  school: School;
  LogoPath
  rowData
  defaultCountry: any = 'FR';
  countries;
  switchbtn: boolean = false;
  UpPhoto: any;
  photobytes: any;
  search:string;
  schoolForm: FormGroup;
  errorMessage = '';
  DialogTitle: string;
  connectedmember
  currentMemberId
  currentMemberStatutId
  currentMemberSchoolId
  constructor( private notification: NotificationService ,private formBuilder: FormBuilder,private schoolService: SchoolService,private userService :UserService) {
   
  }

  ngOnInit() {  
    this.schoolForm = this.formBuilder.group({
      Name: ["", Validators.required],
      Street: ["", Validators.required],
      ZipCode: ["", Validators.required],
      City: ["", Validators.required],
      Country: ["", Validators.required],
      Photo: [""],
      SocietyName: ["", Validators.required],
      SiretCode: ["", [Validators.required,Validators.pattern('^[0-9]{14}$')]],
      NumTVA: ["", Validators.pattern('^(?:[frFR]{2}[0-9]{11})?$')]
    }); 

    this.currentMemberId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];
    this.currentMemberStatutId=this.userService.getMemberStatutId();
    this.currentMemberSchoolId=this.userService.getMemberSchoolId();
 
  this.refreshSchoolList()

    this.schoolForm.controls['Country'].setValue(this.defaultCountry, { onlySelf: true });
    this.schoolService.getCountries().subscribe(
      (countriesData) => this.countries = countriesData,
      (error) => console.log(error)
    );

 
  }


 
  OpenDiag(id:number) {
    this.DialogTitle = id == -1 ? "Ajouter école" : "Modifier école"
    this.schoolService.getSchool(id)
      .subscribe({
        next: (school: School) => this.displaySchool(school),
        error: err => console.log(err)
      });
}
searchResult(data){
  this.search=data
}


 ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
  for (let propName in changes) {
    let changedProp = changes[propName];
    this.currentSchoolId = changedProp.currentValue
    this.DialogTitle = this.currentSchoolId == -1 ? "Ajouter école" : "Modifier école"
    this.getSchool();
  } 
}
 
  getSchool(): void {
    this.schoolService.schoolIdData.subscribe(data => {
      this.currentSchoolId = data;
      this.schoolService.getSchool(this.currentSchoolId)
        .subscribe({
          next: (school: School) => this.displaySchool(school),
          error: err => console.log(err)
        });
    })

  }
  displaySchool(school: School): void {
    if (this.schoolForm) {
      this.schoolForm.reset();
    }
    this.school = school;
    this.schoolForm.patchValue({
      Name: this.school.Name,
      Street: this.school.Street,
      City: this.school.City,
      Country: this.school.Country,
      ZipCode: this.school.ZipCode,
      Photo: this.school.Photo,
      SocietyName: this.school.SocietyName,
      SiretCode: this.school.SiretCode,
      NumTVA: this.school.NumTVA
    });

    this.LogoPath = this.schoolService.GetSchoolPhotoPath(this.school.PhotoPath)

  }

  saveSchool(): void {

    if (this.schoolForm.valid) {    
      const sc = { ...this.school, ...this.schoolForm.value };
      if(this.UpPhoto!=null && this.UpPhoto!=undefined)
      {
      this.photobytes=this.UpPhoto;
      var array =  this.photobytes.split(",", 3);
      this.photobytes=array[1];
      sc.Photo=sc.Name+".jpg"
      }
      else{
        this.photobytes=""
      }
      let schoolModel = {
        PhotoBytes:this.photobytes,
        School: sc

      }
      if (sc.Id === 0) {

        this.schoolService.createSchool(schoolModel)
          .subscribe({
            next: () => this.notification.onSaveComplete('success',"école","ajoutée",this.refreshSchoolList()),
            error: err => Swal(
              'Oops...','Le nom de votre école est déjà pris, merci de renseigner un autre nom.','error')
          });
      } else {

        this.schoolService.updateSchool(schoolModel)
        .subscribe({
          next: () => this.notification.onSaveComplete('success',"école","modifiée",this.refreshSchoolList()),
          
          error: err =>
          Swal(
            'Oops...','Le nom de votre école est déjà pris, merci de renseigner un autre nom.','error'),       
        });
      }

   
    } else {
      this.errorMessage = 'Veuillez saisir correctement les champs demandés.';
    }
}


  deleteItem(id: number) {
    this.notification.deleteElementAlert().then((result) => {
      if (result.value) {
        this.schoolService.deleteSchool(id)
          .subscribe({
            next: ()=> this.notification.onSaveComplete('warning',"école","supprimée",this.refreshSchoolList()),
            error: err => this.errorMessage = err
          });       
      }else{this.refreshSchoolList()}
    })
  }

  onChange(file : File)
  {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.UpPhoto = reader.result;
        this.LogoPath=this.UpPhoto;
      };
    }
  }


  refreshSchoolList() {    
    this.schoolService.getSchools().subscribe({
      next: schools => {
        if(this.currentMemberStatutId===1){ 
            this.rowData = schools        
        }else 
        {
          this.rowData =  schools.filter(x=>x.Id==this.currentMemberSchoolId);           
        }    
      }, error: err => this.errorMessage = err
    });
  }




}
