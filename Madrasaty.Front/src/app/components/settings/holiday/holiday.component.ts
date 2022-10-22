import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Holiday } from 'src/app/models/holiday';
import { HolidaysService } from 'src/app/services/holidays/holidays.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  errorMessage: any;
  rowData: any;
  search
  holiday: Holiday;
  HolidayForm: FormGroup;
  currentHolidayId: any;
  DialogTitle: string;
  switchbtn:boolean=false;
  dataSource
  anneeScolaire: any;

  constructor(private notification: NotificationService,private HolidayService : HolidaysService,private formbuilder: FormBuilder) {

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
        next: anneeScolaireData => this.anneeScolaire = anneeScolaireData,
        error: err => this.errorMessage = err
      });

    this.refreshHolidayList()
  }

  searchResult(data){
    this.search=data 
  }
  saveHoliday(): void {

    if (this.HolidayForm.valid) {
      if (this.HolidayForm.dirty) {
        const aux = { ...this.holiday, ...this.HolidayForm.value };
        
        if (aux.Id === 0 || aux.Id === "" || aux.Id === null) {
          this.HolidayService.createHoliday(aux).subscribe({
            next: () => this.notification.onSaveComplete('success',"Vacance scolaire ","ajoutée",this.refreshHolidayList()),
            error: (err) => (this.errorMessage = err),
          });     
       
        } else {            
          this.HolidayService.updateHoliday(aux).subscribe({
            next: () => this.notification.onSaveComplete('success',"Vacance scolaire ","modifié",this.refreshHolidayList()),
            error: (err) => (this.errorMessage = err),
          });       
      
        }
      } else {
    
      
      }
    } else {

      this.errorMessage = "Please correct the validation errors.";
    
    }
  }

  OpenDiag(id: number) {
    this.DialogTitle = id == -1 ? "Ajouter Vacance" : "Modifier Vacance"
    this.HolidayService.getHoliday(id)
      .subscribe({
        next: (holiday: Holiday) => this.displayHoliday(holiday),
        error: err => console.log(err)
      }); 
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

  refreshHolidayList() {
    this.HolidayService.getHolidays().subscribe({
      next: holidaysData => {
        this.rowData = holidaysData;
      },
      error: err => this.errorMessage = err
    });
  }
  deleteItem(id: number) {
    this.notification.deleteElementAlert().then((result) => {
      if (result.value && id!=0) {
        this.HolidayService.deleteHoliday(id)
          .subscribe({
            next: () => this.notification.onSaveComplete('warning',"Vacance scolaire","supprimée",this.refreshHolidayList()),
            error: err => this.errorMessage = err
          });
        }else{
          this.refreshHolidayList()
        }
   
    })
  }

}
