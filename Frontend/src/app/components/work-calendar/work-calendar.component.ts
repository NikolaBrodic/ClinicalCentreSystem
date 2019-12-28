import { ExaminationInfoComponent } from './../examination-info/examination-info.component';
import { TimeOffNurseService } from './../../services/time-off-nurse.service';
import { TimeOffForWorkCalendar } from './../../models/timeOffForWorkCalendar';
import { TimeOffDoctorService } from '../../services/time-off-doctor.service';
import { Component, OnInit } from '@angular/core';
import { AxiomSchedulerParams } from 'src/app/models/axiomSchedulerParams';
import { ExaminationService } from 'src/app/services/examination.service';
import { Router } from '@angular/router';
import { ExaminationForWorkCalendar } from 'src/app/models/examinationForWorkCalendar';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { AxiomSchedulerEvent } from 'axiom-scheduler';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  axiomSchedulerParams = new AxiomSchedulerParams();
  events: (ExaminationForWorkCalendar | TimeOffForWorkCalendar)[] = [];
  colors = {
    'examination': '#3399FF',
    'predef. examination': '#9933FF',
    'operation': '#FF9933',
    'holiday': '#CC0033',
    'time off': '#339933',
  }

  constructor(
    private examinationService: ExaminationService,
    private timeOffDoctorService: TimeOffDoctorService,
    private timeOffNurseService: TimeOffNurseService,
    private userService: UserService, private router: Router, public dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.userService.isDoctor()) {
      this.getDoctorExaminations();
      this.getDoctorTimeOffs();
    }
    else if (this.userService.isNurse()) {
      this.getNurseExaminations();
      this.getNurseTimeOffs();
    }
  }

  getDoctorExaminations(): void {
    this.examinationService.getDoctorExaminationsForWorkCalendar().subscribe((data: ExaminationForWorkCalendar[]) => {
      this.convertExaminations(data);
    })
  }

  getNurseExaminations(): void {
    this.examinationService.getNurseExaminationsForWorkCalendar().subscribe((data: ExaminationForWorkCalendar[]) => {
      this.convertExaminations(data);
    })
  }

  convertExaminations(examinations: ExaminationForWorkCalendar[]): void {
    let event: any = {};
    examinations.forEach((item) => {
      event = {
        'data': {
          'examination': item
        },
        'from': moment(item.interval.startDateTime, 'YYYY-MM-DD HH:mm').toISOString(),
        'to': moment(item.interval.endDateTime, 'YYYY-MM-DD HH:mm').toISOString(),
        'color': this.colors[item.kind.toLowerCase()],
        'locked': true,
      }

      this.events.push(event);
    });

    this.events.map(item =>
      new AxiomSchedulerEvent(
        item['data']['examination']['kind'],
        new Date(item['from']),
        new Date(item['to']),
        {
          examination: item
        },
        item['color'],
        true
      )
    );
  }

  getDoctorTimeOffs() {
    this.timeOffDoctorService.getDoctorTimeOffs().subscribe((data: TimeOffForWorkCalendar[]) => {
      this.convertTimeOffs(data);
    })
  }

  getNurseTimeOffs() {
    this.timeOffNurseService.getNurseTimeOffs().subscribe((data: TimeOffForWorkCalendar[]) => {
      this.convertTimeOffs(data);
    })
  }

  convertTimeOffs(timeOffs: TimeOffForWorkCalendar[]): void {
    let event: any = {};
    let dateFormat = 'YYYY-MM-DD';
    let dateTimeFormat = 'YYYY-MM-DD HH:mm';

    timeOffs.forEach((item) => {
      let itemType = item.type.replace('_', ' ');

      let startDate = moment(item.interval.startDateTime.toString().substr(0, 10), dateFormat);
      let endDate = moment(item.interval.endDateTime.toString().substr(0, 10), dateFormat);
      if (startDate.isSame(endDate)) {
        let startDateTime = moment(item.interval.startDateTime, dateTimeFormat);
        let endDateTime = moment(item.interval.endDateTime, dateTimeFormat);

        event = this.makeEvent(itemType, startDateTime, endDateTime, startDateTime, endDateTime);
        this.events.push(event);
      }
      else {
        let firstDayStartTime = moment(item.interval.startDateTime, dateTimeFormat);
        let firstDayEndTime = moment(item.interval.startDateTime, dateTimeFormat).set({ 'hour': 23, 'minute': 59 });

        let lastDayStartTime = moment(item.interval.endDateTime, dateTimeFormat).set({ 'hour': 0, 'minute': 1 });
        let lastDayEndTime = moment(item.interval.endDateTime, dateTimeFormat);

        event = this.makeEvent(itemType, firstDayStartTime, lastDayEndTime, firstDayStartTime, firstDayEndTime);
        this.events.push(event);

        event = this.makeEvent(itemType, firstDayStartTime, lastDayEndTime, lastDayStartTime, lastDayEndTime);
        this.events.push(event);

        let lastDay = moment(item.interval.endDateTime, dateFormat);
        for (let m = moment(firstDayStartTime, dateFormat).add(1, 'days'); m.isBefore(lastDay); m.add(1, 'days')) {
          let dayStartTime = moment(m, dateFormat).set({ 'hour': 0, 'minute': 1 });
          let dayEndTime = moment(m, dateFormat).set({ 'hour': 23, 'minute': 59 });

          event = this.makeEvent(itemType, firstDayStartTime, lastDayEndTime, dayStartTime, dayEndTime);
          this.events.push(event);
        }
      }
    });

    this.events.map(item =>
      new AxiomSchedulerEvent(
        item['data']['type'],
        new Date(item['from']),
        new Date(item['to']),
        {
          type: item['data']['type'],
          from: item['data']['from'],
          to: item['data']['to'],
        },
        item['color'],
        true
      )
    );
  }

  makeEvent(itemType: string, fromForData: moment.Moment, toForData: moment.Moment, from: moment.Moment, to: moment.Moment): any {
    return {
      'data': {
        'type': itemType,
        'from': fromForData,
        'to': toForData,
      },
      'from': from.toISOString(),
      'to': to.toISOString(),
      'color': this.colors[itemType.toLowerCase()],
      'locked': true,
    }
  }

  // Use to refresh events in calendar if needed
  /*  
  @ViewChild(AxiomSchedulerComponent, { static: false }) scheduler: AxiomSchedulerComponent;
  refreshView(): void {
    this.scheduler.refreshScheduler();
  }
  */
  openViewExamination($event: AxiomSchedulerEvent): void {
    if ($event.data.examination) {
      this.dialog.open(ExaminationInfoComponent, { data: $event.data.examination });
    }
  }

}
