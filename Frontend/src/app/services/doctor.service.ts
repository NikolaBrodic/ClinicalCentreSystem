import { environment } from './../../environments/environment';

import { Doctor } from './../models/doctor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  url = environment.baseUrl + environment.doctor;

  doctorsForAdmin: BehaviorSubject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);
  updateSuccessEmitter = new Subject<Doctor>();
  createSuccessEmitter = new Subject<Doctor>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public create(doctor: Doctor) {
    return this.httpClient.post(this.url, doctor);
  }

  public getAllDoctorsForAdmin(): Observable<Doctor[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: Doctor[]) => {
      this.doctorsForAdmin.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.doctorsForAdmin.asObservable();
  }
}
