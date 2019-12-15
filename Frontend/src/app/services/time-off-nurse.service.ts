import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeOffNurseService {
  url = environment.baseUrl + environment.timeOffNurse;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getNurseTimeOffs() {
    return this.httpClient.get(this.url + "/all");
  }
}
