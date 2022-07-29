import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-discipline-row-levels',
  templateUrl: './discipline-row-levels.component.html',
  styles: []
})
export class DisciplineRowLevelsComponent implements OnInit {
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
  editDisciplineLevels() {
    let id = this.data;
    this.params.context.componentParent.editDisciplineLevels(id);
  }
}
