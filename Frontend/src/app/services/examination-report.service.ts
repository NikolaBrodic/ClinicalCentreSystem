import { ExaminationReport } from './../models/examinationReport';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExaminationReportService {
  url = environment.baseUrl + environment.examinationReport;

  createSuccessEmitter = new Subject<ExaminationReport>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public create(examinationReport: ExaminationReport) {
    return this.httpClient.post(this.url, examinationReport);
  }
}
