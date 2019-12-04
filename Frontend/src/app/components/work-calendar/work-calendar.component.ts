
import { Component, OnInit } from '@angular/core';
import { SAMPLE_EVENTS } from 'src/app/sample-events';
import { AxiomSchedulerParams } from 'src/app/models/axiomSchedulerParams';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  axiomSchedulerParams = new AxiomSchedulerParams();
  events = [...SAMPLE_EVENTS];

  constructor() { }

  ngOnInit() {
  }

  // Use to refresh events in calendar if needed
  /*  
  @ViewChild(AxiomSchedulerComponent, { static: false }) scheduler: AxiomSchedulerComponent;
  refreshView(): void {
    this.scheduler.refreshScheduler();
  }
  */

}
