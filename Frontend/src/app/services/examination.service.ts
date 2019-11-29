import { Examination } from './../models/examination';
import { ClinicService } from 'src/app/services/clinic.service';
import { environment } from './../../environments/environment';

import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Doctor } from '../models/doctor';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService implements OnInit {
  url = environment.baseUrl + environment.patient;

  examinations: BehaviorSubject<Examination[]> = new BehaviorSubject<Examination[]>([]);
  updateSuccessEmitter = new Subject<Examination>();
  createSuccessEmitter = new Subject<Examination>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    
  }

  public getAllExaminationsForPatient(): Observable<Examination[]> {
    this.httpClient.get(this.url + "/examinations-history/1").subscribe((data: Examination[]) => {
      this.examinations.next(data);
    },
    (error: HttpErrorResponse) => {
      return null;
    });
    return this.examinations.asObservable();
  }
}
