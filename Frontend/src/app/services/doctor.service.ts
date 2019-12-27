import { environment } from './../../environments/environment';

import { Doctor } from './../models/doctor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  url = environment.baseUrl + environment.doctor;

  doctorsForAdmin: BehaviorSubject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);
  searchDoctorsForAdmin: BehaviorSubject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);
  updateSuccessEmitter = new Subject<Doctor>();
  createSuccessEmitter = new Subject<Doctor>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public create(doctor: Doctor) {
    return this.httpClient.post(this.url, doctor);
  }

  public put(doctor: Doctor) {
    return this.httpClient.put(this.url, doctor);
  }

  public get(id: number) {
    return this.httpClient.get(this.url + "/" + id);
  }

  public getAllDoctorsForAdmin(): Observable<Doctor[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: Doctor[]) => {
      this.doctorsForAdmin.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.doctorsForAdmin.asObservable();
  }

  public searchDoctorsForAdminRequest(firstName: string, lastName: string, specializedFor: string): Observable<Doctor[]> {
    let params = new HttpParams();
    params = params.append('firstName', firstName);
    params = params.append('lastName', lastName);
    params = params.append('specializedFor', specializedFor);

    this.httpClient.get(this.url + "/search", {
      params: params
    }).subscribe((data: Doctor[]) => {
      this.searchDoctorsForAdmin.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.searchDoctorsForAdmin.asObservable();
  }


  public getAllAvailableDoctors(specialized: any, startDateTime: string, endDateTime: string) {
    let params = new HttpParams();
    params = params.append('specialized', specialized);
    params = params.append('startDateTime', startDateTime);
    params = params.append('endDateTime', endDateTime);

    return this.httpClient.get(this.url + "/available", {
      params: params
    });
  }

  public deleteDoctor(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }

  public isAvailable(doctorId: any, startTime: string, endTime: string) {
    let params = new HttpParams();
    params = params.append('doctorId', doctorId);
    params = params.append('startTime', startTime);
    params = params.append('endTime', endTime);

    return this.httpClient.get(this.url + "/is-available", {
      params: params
    });
  }
}
