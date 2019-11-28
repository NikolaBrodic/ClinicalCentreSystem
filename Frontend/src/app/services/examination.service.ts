import { Subject } from 'rxjs';
import { Examination } from './../models/examination';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  url = environment.baseUrl + environment.examination;
  selectedExamination: Examination;
  constructor(private httpClient: HttpClient, private router: Router) { }

  public getAwaitingExaminations(pageIndex, pageSize, sort: MatSort) {
    let params = new HttpParams();
    params = params.append('kind', "EXAMINATION")
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active);
        params = params.append('direction', sort.direction);
      }

    }

    return this.httpClient.get(this.url + "/get-awaiting", {
      params: params
    });
  }


  public getDoctorsExaminations(pageIndex, pageSize, sort: MatSort) {
    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active);
        params = params.append('direction', sort.direction);
      }

    }
    return this.httpClient.get(this.url + "/get-doctors-examinations", {
      params: params
    });
  }

  public cancelExamination(examination: Examination) {
    return this.httpClient.delete(this.url + "/cancel/" + examination.id);
  }
}
