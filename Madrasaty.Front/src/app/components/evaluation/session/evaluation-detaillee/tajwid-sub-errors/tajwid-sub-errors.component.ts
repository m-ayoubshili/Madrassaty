import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EvaluationDetailleeService } from 'src/app/services/evaluation-detaillee/evaluation-detaillee.service';
import { TajwidErrorService } from 'src/app/services/tajwid-error/tajwid-error.service';

@Component({
  selector: 'app-tajwid-sub-errors',
  templateUrl: './tajwid-sub-errors.component.html',
  styleUrls: ['./tajwid-sub-errors.component.scss']
})
export class TajwidSubErrorsComponent implements OnInit {
  subErrorsList: any[];
  errorTest
  modalTitle: string;
  finalSubErrorsList: any[];
  Errors: any[];
  constructor(private evaluationDetailleeService: EvaluationDetailleeService, public bsModalRef: BsModalRef, private _modalService: BsModalService,private tajwidErrorService: TajwidErrorService) { }
  
  ngOnInit() {
   // this.subErrorsList = [];
    
    
   
   /* this.evaluationDetailleeService.recitationDetailData.subscribe(tajwid => {
      this.evaluationDetailleeService.getRecitationTajwidErrors(tajwid).subscribe((r_t_errors: any[]) => {
        this.evaluationDetailleeService.itemData.subscribe(tajwid => {

          tajwid.children.forEach(element => {
            let test = r_t_errors.find(a => a.TajwidErrorId == element.name)
            if (test) {
              let subError = {
                Id: element.name,
                Wording: element.name,
                cssclass: "btn btn-danger dim",
                clicked: true
              }
              this.subErrorsList.push(subError);
              console.log(this.subErrorsList)
            
            }
            else {
              let subError = {
                Id: element.name,
                Wording: element.name,
                cssclass: "btn btn-info dim",
                clicked: false
              }
              this.subErrorsList.push(subError);
            }
          

          });

        })
      })
    })    */
  }
  onButtonClick(btnClicked) {
    let itemToEdit = this.subErrorsList.find(item => item.name == btnClicked.name);
    console.log("the value is 😊",this.subErrorsList.find(item => item.code == btnClicked.code));
    console.log("btn clicked 😊",btnClicked.name);
    if (itemToEdit.clicked) {
      itemToEdit.cssclass = "btn btn-danger"
      this.Errors.push(itemToEdit)
      itemToEdit.clicked = !itemToEdit.clicked

    }
    else {
      itemToEdit.cssclass = "btn btn-danger dim"
      itemToEdit.clicked = !itemToEdit.clicked

    }
  

  }
  saveSubErrors() {
    this.finalSubErrorsList = this.subErrorsList.filter((a) => a.clicked == true).map(a => a.name);

    this._modalService.setDismissReason('Yes');

    this.bsModalRef.hide();
    console.log(this.finalSubErrorsList)
  }
  

}
