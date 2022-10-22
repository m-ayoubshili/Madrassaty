import { Member } from 'src/app/models/member';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput } from '@fullcalendar/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  currentMemberStatutId;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions3>;
  public chartOptions2: any;
  chartColor="primary"
  chartHeight="175px"
  selected
  parentchild
  currentMemberId
  genders=[{ id: 'M', name: 'Masculin' }, { id: 'F', name: 'Féminin' }];
  ConnectedUser:Member
  constructor(private userService: UserService,private memberList:MembersListService) {
   

    this.chartOptions3 = {
      series: [45, 55],
      chart: {
        type: "donut"
      },
      labels: ["Female Students", "Male Students"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    
    this.chartOptions = {
      series: [
        {
          name: "Total Collections",    
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Fees Collection",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }


  ngOnInit() {     
    this.currentMemberId=JSON.parse(JSON.parse(localStorage.getItem('currentUser'))['user'])['Id'];
    this.currentMemberStatutId=this.userService.getMemberStatutId();
    this.chartOptions2 = getChartOptions(this.chartHeight, this.chartColor);
    this.memberList.getMembers().subscribe((response)=>{
      var specefiqueMember=response.filter(x=>x.ParentEmail=="parent1@gmail.com")
      this.parentchild=specefiqueMember
      console.log(this.parentchild)

     
    })
    this.getMember()
  }

  getvalue(id){
    return this.genders.find(x=>x.id==id).name     
  }
  getMember() {
    this.memberList.getMember(this.currentMemberId)
    .subscribe(data=>{  
     this.ConnectedUser=data;
  
    });
  }


  currentEvents: EventApi[] = [];

  
  eventGuid = 0;
  TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
 
   INITIAL_EVENTS: EventInput[] = [
   {
     id: this.createEventId(),
     title: 'All-day event',
     start: this.TODAY_STR
   }
 ];


  calendarOptions: CalendarOptions = {
    height:500,
    aspectRatio: 0.2,
  
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    initialEvents: this.INITIAL_EVENTS,
    events: [ // <= here
    { title: 'event 1', date: '2022-05-01' },
    { title: 'event 2', date: '2022-05-02' }
  ]

  };

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  eventDragStop(arg) {

  }




  createEventId() {
  return String(this.eventGuid++);
}

 
}
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
export type ChartOptions3 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
function getChartOptions(chartHeight: string, chartColor: string) {
  const labelColor = getCSSVariableValue('--bs-gray-500');
  const borderColor = getCSSVariableValue('--bs-gray-200');
  const secondaryColor = getCSSVariableValue('--bs-gray-300');
  const baseColor = getCSSVariableValue('--bs-' + chartColor);

  return {
    series: [
      {
        name: 'Net Profit',
        data: [50, 60, 70, 80, 60, 50, 70, 60],
      },
      {
        name: 'Revenue',
        data: [50, 60, 70, 80, 60, 50, 70, 60],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: chartHeight,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: 'solid',
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return '$' + val + ' revenue';
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      padding: {
        top: 10,
      },
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };




  
}
