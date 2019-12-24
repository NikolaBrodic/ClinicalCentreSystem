import { PredefinedExamination } from './../models/predefinedExamination';
import { Subject, BehaviorSubject } from 'rxjs';
import { Examination } from './../models/examination';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { PatientWithId } from '../models/patientWithId';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  url = environment.baseUrl + environment.examination;
  selectedExamination: Examination;
  successCreatedPredefinedExamination = new Subject<PredefinedExamination>();
  startingExamination: number;
  choosenPatient: PatientWithId;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getAwaitingExaminations(pageIndex, pageSize, sort: MatSort) {
    let params = new HttpParams();
    params = params.append('kind', "EXAMINATION")
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active + "," + sort.direction);
      }
    }

    return this.httpClient.get(this.url + "/get-awaiting", {
      params: params
    });
  }


  public getCreatedPredefinedExaminations(pageIndex: any, pageSize: any, sort: MatSort) {
    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active + "," + sort.direction);
      }
    }

    return this.httpClient.get(this.url + "/get-predefined-examinations", {
      params: params
    });
  }

  public getDoctorsExaminations(pageIndex, pageSize, sort: MatSort) {
    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active + "," + sort.direction);
      }

    }
    return this.httpClient.get(this.url + "/get-doctors-examinations", {
      params: params
    });
  }

  public getDoctorExaminationsForWorkCalendar() {
    return this.httpClient.get(this.url + "/doctor-examinations");
  }

  public getNurseExaminationsForWorkCalendar() {
    return this.httpClient.get(this.url + "/nurse-examinations");
  }

  public getPatientStartingExamination(patientId) {
    return this.httpClient.get(this.url + "/starting/" + patientId);
  }

  public cancelExamination(examination: Examination) {
    return this.httpClient.delete(this.url + "/cancel/" + examination.id);
  }

  public createPredefinedExamination(predefinedExamination: PredefinedExamination) {
    return this.httpClient.post(this.url + "/predefined-examination", predefinedExamination);
  }


}
