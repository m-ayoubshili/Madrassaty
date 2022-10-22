import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-btn-update-delete',
  templateUrl: './btn-update-delete.component.html',
  styles: [
  ]
})
export class BtnUpdateDeleteComponent implements OnInit {
  data: any;
  params: any;
  bsModalRef: BsModalRef;
  constructor() { }
  agInit(params) {
    this.params = params;
    this.data = params.value;
  }
  ngOnInit() {
  }
  editItem() {
    let id = this.data;
    this.params.context.componentParent.OpenDiag(id,true);
  }
  deleteItem() {
    let id = this.data;
    this.params.context.componentParent.deleteItem(id);
  }

  onEdit() {
    this.params.api.setFocusedCell(this.params.node.rowIndex,  "Wording");
    this.params.api.startEditingCell({
      rowIndex: this.params.node.rowIndex,
      colKey: "Wording"
    });
  }
}

