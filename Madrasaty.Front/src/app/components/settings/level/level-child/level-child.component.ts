import { Component, OnInit } from '@angular/core';
import { MemberFilter } from 'src/app/models/member-filter';
import { LevelService } from 'src/app/services/level/level.service';
import { MembersListService } from 'src/app/services/members/members-list.service';

@Component({
  selector: 'app-level-child',
  templateUrl: './level-child.component.html',
  styles: [
  ]
})
export class LevelChildComponent implements OnInit {

  test: string
  currentLevelId: any;
  students: MemberFilter[] = [];
  params: any;
  data: any;
  constructor(private levelService: LevelService, private memberService: MembersListService) { }
  agInit(params): void {
    this.params = params;
    this.data = params.data;

  }
  ngOnInit() {
    // this.getStudents();
  }
  getStudents(): void {
    this.memberService.GetStudents(this.params.data.Id)
      .subscribe({
        next: (levels) => this.students = levels,
        error: err => console.log(err)
      });
  }
  setDisciplineLevelStudents() {
    this.params.context.componentParent.getStudents(this.params.data.Id);
    this.params.context.componentParent.currentLevelId=this.params.data.Id;

  }

}

