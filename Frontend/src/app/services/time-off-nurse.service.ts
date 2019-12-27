import { CreateTimeOffRequest } from './../models/createTimeOffRequest';
import { RequestsForHolidayOrTimeOff } from './../models/requestForHolidayOrTimeOff';
import { Subject } from 'rxjs';
import { TimeOffForWorkCalendar } from './../models/timeOffForWorkCalendar';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeOffNurseService {
  url = environment.baseUrl + environment.timeOffNurse;
  rejectSuccessEmitter = new Subject<RequestsForHolidayOrTimeOff>();
  approveSuccessEmitter = new Subject<RequestsForHolidayOrTimeOff>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getNurseTimeOffs() {
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
