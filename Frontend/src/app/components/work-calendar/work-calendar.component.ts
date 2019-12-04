import { CalendarEventModel } from './../../models/calendarEventModel';
import { Component, OnInit } from '@angular/core';
import { SAMPLE_EVENTS } from 'src/app/sample-events';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  calendarEventModel = new CalendarEventModel();
  events = [...SAMPLE_EVENTS];

  constructor() { }

  ngOnInit() {
    console.log(this.calendarEventModel);
  }

  // Use to refresh events in calendar if needed
  /*  
  @ViewChild(AxiomSchedulerComponent, { static: false }) scheduler: AxiomSchedulerComponent;
  refreshView(): void {
    this.scheduler.refreshScheduler();
  }
  */

}
