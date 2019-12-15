import { ClinicAdmin } from '../models/clinicAdmin';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ClinicAdministrator } from '../models/clinicAdministrator';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { Clinic } from '../models/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicAdministratorService {
  url = environment.baseUrl + environment.clinicAdmin;

  clinicAdmins: BehaviorSubject<ClinicAdministrator[]> = new BehaviorSubject<ClinicAdministrator[]>([]);
  addSuccessEmitter = new Subject<ClinicAdministrator>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public add(clinicAdmin: ClinicAdministrator) {
    return this.httpClient.post(this.url, clinicAdmin);
  }

  public put(clinicAdmin: ClinicAdmin) {
    return this.httpClient.put(this.url, clinicAdmin);
  }

  public get(id: number) {
    return this.httpClient.get(this.url + "/" + id);
  }

  public getAllClinicAdminsInClinic(clinic: Clinic): Observable<ClinicAdministrator[]> {
    const params = new HttpParams().set("clinicId", clinic.id.toString());

    this.httpClient.get(this.url + "/all", { params }).subscribe((data: ClinicAdministrator[]) => {
      this.clinicAdmins.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.clinicAdmins.asObservable();
  }
}
