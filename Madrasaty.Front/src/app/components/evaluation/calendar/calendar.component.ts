import { CalendarService } from './../../../services/calendar/calendar.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ExamensService } from 'src/app/services/Examens/examens.service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  examslist: CalendarEvent[] = [];
  //calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  constructor(private calendarService: CalendarService,private examService: ExamensService,private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.calendarService.getExamensEvent().subscribe(exams => {
      this.examslist = exams;
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
   
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ],
  

  };


  

  eventDragStop(arg) {

  }

  
  refreshEventsList() {
    this.calendarService.getExamensEvent().subscribe({
      next: ExamensData => {
        this.examslist = ExamensData;
      },
      error: err => console.log(err)
    });
  }
 

}
