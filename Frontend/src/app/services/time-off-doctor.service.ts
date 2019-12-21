import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimeOffDoctorService {
  url = environment.baseUrl + environment.timeOffDoctor;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getDoctorTimeOffs() {
    return this.httpClient.get(this.url + "/all");
  }
}
