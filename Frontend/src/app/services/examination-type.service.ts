import { Clinic } from 'src/app/models/clinic';
import { ExaminationTypeWithNumber } from './../models/examinationTypewuthNumber';
import { environment } from './../../environments/environment';
import { ExaminationType } from './../models/examinationType';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { isUndefined } from 'util';
@Injectable({
  providedIn: 'root'
})
export class ExaminationTypeService {
  url = environment.baseUrl + environment.examinationType;

  examinationTypesForAdmin: BehaviorSubject<ExaminationType[]> = new BehaviorSubject<ExaminationType[]>([]);
  examinationTypesForPatient: BehaviorSubject<ExaminationType[]> = new BehaviorSubject<ExaminationType[]>([]);
  updateSuccessEmitter = new Subject<ExaminationType>();
  createSuccessEmitter = new Subject<ExaminationType>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public create(examinationType: ExaminationType) {
    return this.httpClient.post(this.url, examinationType);
  }

  public edit(examinationType: ExaminationType) {
    return this.httpClient.put(this.url, examinationType);
  }

  public getExaminationTypesForAdmin(): Observable<ExaminationType[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: ExaminationType[]) => {
      this.examinationTypesForAdmin.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.examinationTypesForAdmin.asObservable();
  }

  public getExaminationTypesForPatient(clinic: Clinic): Observable<ExaminationType[]> {
    this.httpClient.get(this.url + "/patient/all/" + clinic.id).subscribe((data: ExaminationType[]) => {
      this.examinationTypesForPatient.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.examinationTypesForPatient.asObservable();
  }

  public getExaminationTypesWithSearch(searchLabel: string, searchPrice: any) {
    let params = new HttpParams();
    params = params.append('searchLabel', searchLabel);
    params = params.append('searchPrice', searchPrice);
    return this.httpClient.get(this.url + "/search-types", {
      params: params
    });
  }

  public deleteType(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
