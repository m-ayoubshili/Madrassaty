import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  ConfirmEmailForm: any;
  errorMessage
  constructor(  private fb: FormBuilder ,private router:Router, private registerservice:RegisterService) { }

  ngOnInit(): void {
    this.ConfirmEmailForm = this.fb.group({

      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
       ])
       ),
    })
  }


  ConfirmEmail(){    
    let email=this.ConfirmEmailForm.get('email').value
    var data = { ...data,email:email};
    this.registerservice.ConfirmEmail(data).subscribe({
      next: () => this.onSaveComplete(),
      error: err => this.errorMessage = err
    });

  }
  
  onSaveComplete(): void {
    Swal({
      position: 'top',
      type: "success",
      title: 'Email confirmé avec succès',
      showConfirmButton: false,
      timer: 5000,
      toast: true
    });
      this.router.navigate(['auth/login'])

  }
}
