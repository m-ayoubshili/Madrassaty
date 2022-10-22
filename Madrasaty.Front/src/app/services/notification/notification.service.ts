import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


  onSaveComplete(type,title: string,msg: string,refreshCallback): void {
    if (msg != "") {
      Swal({
        position: 'top',
        title: "Votre "+ title  +" a bien été " + msg,
        type:  type,
        showConfirmButton: false,
        timer: 5000,
        toast: true,
      });
      refreshCallback;

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
  warningPopupForLevel(){
    return Swal({
      position: 'top',
      title: "Veuillez selectionner une discipline",
      type: 'info',
      showConfirmButton: false,
      timer: 2000,
      toast: true
    })
  }
}
