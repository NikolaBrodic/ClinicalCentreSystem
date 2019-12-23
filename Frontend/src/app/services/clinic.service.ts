import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Clinic } from '../models/clinic';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  url = environment.baseUrl + environment.clinic;

  clinic: BehaviorSubject<Clinic> = new BehaviorSubject<Clinic>(null);
  clinics: BehaviorSubject<Clinic[]> = new BehaviorSubject<Clinic[]>([]);
  addSuccessEmitter = new Subject<Clinic>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public add(clinic: Clinic) {
    return this.httpClient.post(this.url, clinic);
  }

  public getAllClinics(): Observable<Clinic[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: Clinic[]) => {
      this.clinics.next(data)
    },
      (error: HttpErrorResponse) => {

      });
    return this.clinics.asObservable();
  }


  public getClinicById(clinicId) {
    return this.httpClient.get(this.url + "/" + clinicId);
  }

  public getClinicRevenue(startDate, endDate) {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

    return this.httpClient.get(this.url + "/revenue", {
      params: params
    });
  }

  public getClinicRating() {
    return this.httpClient.get(this.url + "/clinic-rating");
  }
}
