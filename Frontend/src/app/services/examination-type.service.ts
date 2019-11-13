import { environment } from './../../environments/environment';
import { ExaminationType } from './../models/examinationType';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExaminationTypeService {
  url = environment.baseUrl + environment.examinationType;

  examinationTypesForAdmin: BehaviorSubject<ExaminationType[]> = new BehaviorSubject<ExaminationType[]>([]);
  updateSuccessEmitter = new Subject<ExaminationType>();
  createSuccessEmitter = new Subject<ExaminationType>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public create(examinationType: ExaminationType) {
    return this.httpClient.post(this.url, examinationType);
  }

  public getExaminationTypesForAdmin(): Observable<ExaminationType[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: ExaminationType[]) => {
      this.examinationTypesForAdmin.next(data);
    },
      (error: HttpErrorResponse) => {

      });
    return this.examinationTypesForAdmin.asObservable();
  }
}
