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
  editSuccessEmitter = new Subject<ExaminationReport>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public create(examinationId: number, examinationReport: ExaminationReport) {
    return this.httpClient.post(this.url + "/" + examinationId, examinationReport);
  }

  public edit(examinationId: number, examinationReport: ExaminationReport) {
    return this.httpClient.put(this.url + "/" + examinationId, examinationReport);
  }

  public getPatientsExaminationReports(patientId: number) {
    return this.httpClient.get(this.url + "/patients-all/" + patientId);
  }

}
