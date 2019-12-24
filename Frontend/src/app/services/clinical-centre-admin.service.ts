import { ClinicalCentreAdmin } from './../models/clinicalCentreAdmin';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClinicalCentreAdminService {
  url = environment.baseUrl + environment.clinicalCentreAdmin;

  clinicalCentreAdmins: BehaviorSubject<ClinicalCentreAdmin[]> = new BehaviorSubject<ClinicalCentreAdmin[]>([]);
  addSuccessEmitter = new Subject<ClinicalCentreAdmin>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public add(clinicalCentreAdmin: ClinicalCentreAdmin) {
    return this.httpClient.post(this.url, clinicalCentreAdmin);
  }

  public getAllClinicalCentreAdmins(): Observable<ClinicalCentreAdmin[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: ClinicalCentreAdmin[]) => {
      this.clinicalCentreAdmins.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.clinicalCentreAdmins.asObservable();
  }
}
