import { Component, OnInit } from '@angular/core';
import { AxiomSchedulerParams } from 'src/app/models/axiomSchedulerParams';
import { ExaminationService } from 'src/app/services/examination.service';
import { Router } from '@angular/router';
import { ExaminationForWorkCalendar } from 'src/app/models/examinationForWorkCalendar';
import * as moment from 'moment';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  axiomSchedulerParams = new AxiomSchedulerParams();
  events: (ExaminationForWorkCalendar)[] = [];

  colors = {
    "examination": "#3399FF",
    "predef. examination": "#9933FF",
    "operation": "#FF9933",
    "holiday": "#CC0033",
    "time off": "#339933",
  }

  constructor(private examinationService: ExaminationService, private router: Router) { }

  ngOnInit() {
    this.getDoctorExaminations();
  }

  getDoctorExaminations() {
    this.examinationService.getDoctorExaminationsForWorkCalendar().subscribe((data: ExaminationForWorkCalendar[]) => {
      this.convertToEvents(data);
    })
  }

  convertToEvents(examinations: ExaminationForWorkCalendar[]) {
    let event: any = {};
    examinations.forEach(item => {
      event = {
        "data": {
          "kind": item.kind,
          "room": item.room ? item.room.label : null,
          "patientFirstName": item.patient ? item.patient.firstName : null,
          "patientLastName": item.patient ? item.patient.lastName : null,
        },
        "from": moment(item.interval.startDateTime, "DD.MM.YYYY HH:mm").toISOString(),
        "to": moment(item.interval.endDateTime, "DD.MM.YYYY HH:mm").toISOString(),
        "color": this.colors[item.kind.toLowerCase()],
        "locked": true,
      }
      this.events.push(event);
    });
  }

  // Use to refresh events in calendar if needed
  /*  
  @ViewChild(AxiomSchedulerComponent, { static: false }) scheduler: AxiomSchedulerComponent;
  refreshView(): void {
    this.scheduler.refreshScheduler();
  }
  */

}
