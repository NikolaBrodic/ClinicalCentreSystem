import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';
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
  editClinicEmitter = new Subject<Clinic>();
  searchAddressClinicEmitter = new Subject<Clinic>();
  addClinicAdressEmiter = new Subject<Clinic>();
  addSearchAddressClinicEmitter = new Subject<Clinic>();
  constructor(private httpClient: HttpClient, private router: Router) { }

  public add(clinic: Clinic): any {
    return this.httpClient.post(this.url, clinic);
  }

  public edit(clinic: Clinic): any {
    return this.httpClient.put(this.url, clinic);
  }

  public getAllClinics(): Observable<Clinic[]> {
    this.httpClient.get(this.url + '/all').subscribe((data: Clinic[]) => {
      this.clinics.next(data)
    });
    return this.clinics.asObservable();
  }

  public getClinicById(clinicId: any): any {
    return this.httpClient.get(this.url + '/' + clinicId);
  }

  public getClinicRevenue(startDate: any, endDate: any): any {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

    return this.httpClient.get(this.url + '/revenue', {
      params: params
    });
  }

  public getClinicRating(): any {
    return this.httpClient.get(this.url + '/clinic-rating');
  }

  public getDailyStatistic(): any {
    return this.httpClient.get(this.url + '/daily-statistic');
  }

  public getMountStatistic(): any {
    return this.httpClient.get(this.url + '/mount-statistic');
  }

  public getWeekStatistic(): any {
    return this.httpClient.get(this.url + '/week-statistic');
  }
  public getClinicInWhichClinicAdminWorks(): any {
    return this.httpClient.get(this.url + '/clinic-in-which-admin-works');
  }

  public get(quaery: string): any {
    return this.httpClient.get('https://nominatim.openstreetmap.org/search?q=' + quaery + '&format=json');
  }
}
