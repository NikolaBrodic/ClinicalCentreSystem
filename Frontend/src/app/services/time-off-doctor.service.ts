import { CreateTimeOffRequest } from './../models/createTimeOffRequest';
import { RequestsForHolidayOrTimeOff } from './../models/requestForHolidayOrTimeOff';
import { TimeOffForWorkCalendar } from './../models/timeOffForWorkCalendar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeOffDoctorService {
  url = environment.baseUrl + environment.timeOffDoctor;
  rejectSuccessEmitter = new Subject<RequestsForHolidayOrTimeOff>();
  approveSuccessEmitter = new Subject<RequestsForHolidayOrTimeOff>();

  constructor(private httpClient: HttpClient) { }

  public getDoctorTimeOffs() {
    return this.httpClient.get(this.url + "/all");
  }

  public getRequests() {
    return this.httpClient.get(this.url + "/requests-for-holiday-or-time-off");
  }

  public reject(id: number, reason: string) {
    return this.httpClient.put(this.url + "/reject-request-for-holiday-or-time-off/" + id, reason);
  }

  public approve(timeOff: TimeOffForWorkCalendar) {
    return this.httpClient.put(this.url + "/approve-request-for-holiday-or-time-off/" + timeOff.id, timeOff);
  }

  public create(requestForTimeOff: CreateTimeOffRequest) {
    return this.httpClient.post(this.url, requestForTimeOff);
  }
}
