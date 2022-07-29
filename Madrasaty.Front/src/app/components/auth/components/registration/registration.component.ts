import { Component, OnInit, OnDestroy, Input, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';
import { GenericValidator } from 'src/app/shared/generic-validator';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import Swal from 'sweetalert2'
import { RegisterService } from 'src/app/services/register.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @Input() Password='';
  @Input() ConfirmPassword='';
  hasError: boolean;
  registerform: FormGroup;
  minDate: Date;
  maxDate: Date;
  public genericValidator: GenericValidator;
  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};
  schoolId;
  MemberStatusId
  defaultCountry: any = 'FR';
  countries;
  Country;
  listAdmins: string[];

  private unsubscribe: Subscription[] = [];

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  passmsg: string;
  errorMessage: any;
  constructor(
    private register: RegisterService,
    private router: Router,
    private fb: FormBuilder,
  ) {

    this.validationMessages = {
      // Email: { required: 'Veuillez saisir une adresse email valide.' },
      Email: {
        pattern: 'Entrez une adresse email valide.',
        required: 'Adresse email est obligatoire.'

      },
      Password: {
        required: 'Le mot de passe est obligatoire.',
        minlength: 'Les mots de passe doivent contenir au moins 6 caractères.'
      },
      LastName: { required: 'Prénom est  obligatoire.' },
      FirstName: { required: 'Nom est  obligatoire.' },
      Profession: { required: 'Profession est  obligatoire.' },
      Street: { required: 'Adresse est  obligatoire.' },
      ZipCode: { required: 'Code postal est  obligatoire.' },
      City: { required: 'Cité est  obligatoire.' },
      BirthDate: { required: 'La date de naissance est obligatoire.' },
      SchoolId: { required: 'Il faut choisir une école' },
      Gender: { required: 'Genre est obligatoire.' },
      Country: { required: 'Il faut choisir un pays.' },
      MembreStatusId:{required:'il faut choisir un role'},
      ConfirmPassword: {
        required: 'La confirmation doit correspondre au mot de passe.',
        minlength: 'La confirmation de mot passe doivent contenir au moins 6 caractères.',
        bind: 'La confirmation doit correspondre au mot de passe.'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.minDate = new Date();
    this.maxDate = new Date();

    this.minDate.setDate(this.minDate.getDate() - 30000);
    this.maxDate.setDate(this.maxDate.getDate());

  }

  ngOnInit(): void {
    this.registerform = this.fb.group({
      Email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
       ])
       ),
      Password: new FormControl("",[
        Validators.required,
        Validators.minLength(6),
        //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
      ConfirmPassword: new FormControl("",[Validators.required,Validators.minLength(6),] ),
      LastName: new FormControl("", [Validators.required]),
      FirstName: new FormControl("", [Validators.required]),
      Profession: new FormControl("", [Validators.required]),
      BeginningDate: new FormControl(),
      Street: new FormControl("", [Validators.required]),
      ZipCode: new FormControl("", [Validators.required]),
      City: new FormControl("", [Validators.required]),
      SchoolId: new FormControl("", [Validators.required]),
      Gender: new FormControl("", [Validators.required]),
      Country: new FormControl("", [Validators.required]),
      BirthDate: new FormControl(null, [Validators.required]),
      PhotoPath: new FormControl(),
      MembreStatusId: new FormControl("",[Validators.required])

    }
    );
    this.registerform.controls['Country'].setValue(this.defaultCountry, { onlySelf: true });
    this.register.getCountries().subscribe(
      (countriesData) => this.countries = countriesData,
      (error) => console.log(error)
    );
    this.register.getSchools().subscribe((schoolsData) => this.schoolId = schoolsData);
    this.register.getMemberStatus().subscribe((MembersData) => this.MemberStatusId = MembersData);
  }


  ngAfterViewInit(): void {

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    merge(this.registerform.valueChanges, ...controlBlurs).pipe(
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registerform);
    });
  }

  checkPassSame() {
    let Password = this.registerform.value.Password;
    let ConfirmPassword = this.registerform.value.ConfirmPassword;
    if(Password == ConfirmPassword ) {
      this.passmsg = '';
      return false;
    }else {
      this.passmsg = "Password did not match.";
      return true;
    }
  }

  GetAdmins(data)
  {
    this.register.getAdmins(data.SchoolId).subscribe(admins=> {
      this.listAdmins=admins,
      this.RegisterUser(data);
    });
  }

  RegisterUser(data) {

    if (this.registerform.valid) {

      data = { ...data, ListEmail: this.listAdmins};
      let dt=this.registerform.get('MembreStatusId').value;
      data={ ...data, MemberStatusId: dt};
      let date= this.registerform.get('BirthDate').value ;
      date=new Date();
      data={ ...data, BirthDate: date};

          this.register.RegisterUser(data) .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }
  }

  onSaveComplete(): void {
    Swal({
      position: 'top',
      type: "success",
      title: 'compte créer avec succès',
      showConfirmButton: false,
      timer: 5000,
      toast: true
    });
      this.router.navigate(['auth/login'])

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}



