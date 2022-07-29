import { Component, ElementRef, OnInit, SimpleChange, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { School } from 'src/app/models/school';
import { SchoolService } from 'src/app/services/school/school.service';
import { GenericValidator } from 'src/app/shared/generic-validator';
import Swal from 'sweetalert2'
import {MatCardModule} from '@angular/material/card';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GridOptions } from 'ag-grid-community';
@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
})
export class SchoolComponent implements OnInit {

  currentSchoolId: number;
  school: School;
  LogoPath: string | ArrayBuffer;
  rowData
  defaultCountry: any = 'FR';
  countries;
  switchbtn: boolean = false;
  displayMessage: { [key: string]: string } = {};
  UpPhoto: any;
  photobytes: any;
  search:string;
  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };
  schoolForm: FormGroup;
  errorMessage = '';
  displayedColumns: string[] = ['Ecole', 'Adresse', 'TVA', 'Siret','SocietyName','Actions'];
  dataSource:any
  columnDefs

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  DialogTitle: string;
  domLayout: string;
  paginationPageSize: number;


  constructor(private formBuilder: FormBuilder,private schoolService: SchoolService,private dialog: MatDialog) {

    this.dataSource = new MatTableDataSource<any>(this.rowData);
    this.dataSource.paginator = this.paginator;
    this.schoolService.getCountries().subscribe((countriesData) => {

      this.countries = countriesData

    },(error) => console.log(error)
  );


    this.validationMessages = {
      Name: { required: 'Le nom est obligatoire et doit être unique.' },
      Street: { required: 'Adresse est obligatoire.' },
      ZipCode: { required: 'Le code postale est obligatoire.' },
      City: { required: 'La ville est obligatoire.' },
      Country: {required: 'Le pays est obligatoire.'},
      SocietyName: { required: 'Le nom de la société est obligatoire.' },
      SiretCode: { required: 'La SIRET est obligatoire.',  pattern:'La SIRET doit contenir 14 chiffres : 9 SIREN + 5 NIC' },
      NumTVA: { pattern:'Le numéro de TVA intracommunautaire doit contenir le code FR + 11 Chiffres'}
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
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
  }

  OpenDiag(id: number) {
    let dialogRef = this.dialog.open(this.callAPIDialog,{panelClass: 'my-custom-dialog-class'});
    this.DialogTitle = id == -1 ? "Ajouter école" : "Modifier école"
    this.schoolService.getSchool(id)
      .subscribe({
        next: (school: School) => this.displaySchool(school),
        error: err => console.log(err)
      });
}
ngAfterViewInit(): void {
  const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(this.schoolForm.valueChanges, ...controlBlurs).pipe(
  ).subscribe(value => {
    this.displayMessage = this.genericValidator.processMessages(this.schoolForm);
  });
  this.dataSource = new MatTableDataSource<any>(this.rowData);

}

ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
  for (let propName in changes) {
    let changedProp = changes[propName];
    this.currentSchoolId = changedProp.currentValue
    this.DialogTitle = this.currentSchoolId == -1 ? "Ajouter école" : "Modifier école"
    this.getSchool();
  }
}

  ngOnInit() {
    this.switchbtn = false;
    this.schoolService.getSchools().subscribe({
      next: schools => {
        this.rowData = schools;
        console.log(this.rowData)
        this.dataSource = new MatTableDataSource<any>(this.rowData);
      }, error: err => this.errorMessage = err
    });

    this.schoolForm.controls['Country'].setValue(this.defaultCountry, { onlySelf: true });
    this.schoolService.getCountries().subscribe(
      (countriesData) => this.countries = countriesData,
      (error) => console.log(error)
    );
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
       if (this.schoolForm.dirty) {
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
            next: () => this.onSaveComplete("ajoutée"),
            error: err => Swal(
              'Oops...',
              'Le nom de votre école est déjà pris, merci de renseigner un autre nom.',
               'error')
          });
      } else {

        this.schoolService.updateSchool(schoolModel)
        .subscribe({
          next: () => this.onSaveComplete("modifiée"),
          error: err =>
          Swal(
            'Oops...',
            'Le nom de votre école est déjà pris, merci de renseigner un autre nom.',
             'error')
        });
      }

    } else {
      this.errorMessage = 'Veuillez saisir correctement les champs demandés.';
    }
    }
}

  onSaveComplete(msg: string): void {
    if (msg != "") {
      Swal({
        position: 'top',
        title: "Votre école a bien été " + msg,
        type: 'success',
        showConfirmButton: false,
        timer: 5000,
        toast: true,
      });


    }
    this.refreshSchoolList()
  }
  deleteItem(id: number) {

    this.deleteElementAlert().then((result) => {
      if (result.value) {
        this.schoolService.deleteSchool(id)
          .subscribe({
            next: () => this.refreshSchoolList(),
            error: err => this.errorMessage = err
          });
        Swal({
          position: 'top',
          title: "Votre école a bien été supprimée",
          type: 'warning',
          showConfirmButton: false,
          timer: 5000,
          toast: true,
        });
      }
    })
  }
  ClearForm(){
    this.schoolForm.reset()
    this.LogoPath='';

  }
  onChange(file : File)
  {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.UpPhoto = reader.result;
        this.LogoPath=this.UpPhoto;
        console.log(this.LogoPath);
      };
    }
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
  refreshSchoolList() {
    this.schoolService.getSchools().subscribe((schools)=>{
        this.rowData = schools;
        this.dataSource = new MatTableDataSource<any>(this.rowData);
    });
  }
  switchToCard(){
    this.switchbtn = !(this.switchbtn);
  }




}
