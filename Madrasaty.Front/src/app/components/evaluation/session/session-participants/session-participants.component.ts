import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { SessionParticipantService } from 'src/app/services/session-participants/session-participants.service';

@Component({
  selector: 'app-session-participants',
  templateUrl: './session-participants.component.html',
  styleUrls: ['./session-participants.component.scss']
})
export class SessionParticipantsComponent implements OnInit {
  currentSession;
  model;
  sessionPart;
  sessionId;
  students;
  student;
  recitationType;

  errorMessage = '';
  constructor(private sessionParticipantService: SessionParticipantService, private memberService : MembersListService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    const param = this.route.snapshot.paramMap.get('Id');
    if (param) {
      this.sessionId = param;
    }

    this.sessionParticipantService.GetStudents(this.sessionId).subscribe({
      next: participants => {
      this.students = participants;
      console.log(participants);
      },
      error: err => this.errorMessage = err
    });
     this.sessionParticipantService.getSession(this.sessionId).subscribe({
      next: session => {
      this.recitationType = session.TypeEvaluation;
  
      },
      error: err => this.errorMessage = err
    });
  }
  setStudentPresence(sessionPart){
    this.model = {
      StudentId : sessionPart.StudentId,
      SessionId : this.currentSession["Id"],
      FullName : sessionPart.FullName,
      BirthDate : sessionPart.BirthDate,
      Email : sessionPart.Email,
      PhoneNumber : sessionPart.PhoneNumber,
      StartTime : sessionPart.StartTime,
      Present : sessionPart.Present,
    }
    this.memberService.MemberById(this.model).subscribe({
      next: student => {
        this.student = student;
      },
      error: err => this.errorMessage = err
    });
  }
  goToDEtaille(sessionId,id){
    this.router.navigate(['/crafted/evaluation/evaluation-detaillee/'+id+'/'+sessionId]);
  }

  goTOsimple(sessionId,id){
    this.router.navigate(['/crafted/evaluation/evaluation-simple/'+id+'/'+sessionId]);
  }

}
