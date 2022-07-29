import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent, merge, Observable } from 'rxjs';
import { Holiday } from 'src/app/models/holiday';
import { HolidaysService } from 'src/app/services/holidays/holidays.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  errorMessage: any;
  rowData: any;
  holiday: Holiday;
  HolidayForm: FormGroup;
  currentHolidayId: any;
  DialogTitle: string;
  switchbtn:boolean=false;
  displayedColumns: string[] = ['Description', 'StartDay', 'EndDay','Actions'];
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  anneeScolaire: any;
  dataSource: MatTableDataSource<any>;
  constructor(private HolidayService : HolidaysService,private formbuilder: FormBuilder,private dialog: MatDialog) {

    this.HolidayForm = this.formbuilder.group({
      Id: [""],
      StartDay: ["", Validators.required],
      EndDay: ["", Validators.required],
      description: ["", Validators.required],
    });

  }

  ngOnInit(): void {


    this.HolidayService.GetAnneeScolaireActif().subscribe(
      {
        next: anneeScolaireData => {
          this.anneeScolaire = anneeScolaireData;
        },
        error: err => this.errorMessage = err
      });

    this.HolidayService.getHolidays().subscribe(
      {
        next: holidaysData => {
          this.rowData = holidaysData;
          this.dataSource = new MatTableDataSource<any>(this.rowData);
        },
        error: err => this.errorMessage = err
      });
  }

  saveHoliday(): void {
    if (this.HolidayForm.valid) {
      if (this.HolidayForm.dirty) {
        const aux = { ...this.holiday, ...this.HolidayForm.value };

        if (aux.Id === 0 || aux.Id === "" || aux.Id === null) {
          this.HolidayService.createHoliday(aux).subscribe({
            next: () => this.onSaveComplete("ajouté"),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          this.HolidayService.updateHoliday(aux).subscribe({
            next: () => this.onSaveComplete("modifié"),
            error: (err) => (this.errorMessage = err),
          });
        }
      } else {
        this.onSaveComplete("");
      }
    } else {

      this.errorMessage = "Please correct the validation errors.";
    }
  }

  OpenDiag(id: number) {
    this.dialog.open(this.callAPIDialog,{panelClass: 'my-custom-dialog-class'});
    this.DialogTitle = id == -1 ? "Ajouter Vacance" : "Modifier Vacance"
    this.HolidayService.getHoliday(id)
      .subscribe({
        next: (holiday: Holiday) => this.displayHoliday(holiday),
        error: err => console.log(err)
      });
}


ClearForm(){
  this.HolidayForm.reset()

}
  displayHoliday(holiday: Holiday): void {
    this.holiday = holiday;
    this.HolidayForm.patchValue({
    Id:this.holiday.Id,
    StartDay:new Date(this.holiday.StartDay + "Z"),
    EndDay:new Date(this.holiday.EndDay + "Z"),
    description:holiday.description
    });


  }
  onSaveComplete(msg: string): void {
    if (msg != "") {
      Swal({
        position: 'top',
        type: "success",
        title: 'Vacance scolaire ' + msg + ' avec succès',
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
    this.refreshHolidayList();
  }
  refreshHolidayList() {
    this.HolidayService.getHolidays().subscribe({
      next: holidaysData => {
        this.rowData = holidaysData;
      },
      error: err => this.errorMessage = err
    });
  }
  deleteItem(id: number) {
    this.deleteElementAlert().then((result) => {
      if (result.value && id!=0) {
        this.HolidayService.deleteHoliday(id)
          .subscribe({
            next: () => {
              this.refreshHolidayList(),
             this.deleteSuccessfully()
            },
            error: err => this.errorMessage = err
          });

      }
      else
      {
        this.refreshHolidayList()

      }
    })
  }
  deleteSuccessfully(){
    return Swal({
      position: 'top',
      title: "Vacance scolaire supprimée avec succès",
      type: 'warning',
      showConfirmButton: false,
      timer: 2000,
      toast: true,
    });

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

  switchToCard(){
    this.switchbtn = !(this.switchbtn);
  }


}
