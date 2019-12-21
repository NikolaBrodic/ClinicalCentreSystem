import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MedicalRecord } from '../models/medicalRecord';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  url = environment.baseUrl + environment.medicalRecord;

  editSuccessEmitter = new Subject<MedicalRecord>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public get(patientId: number) {
    return this.httpClient.get(this.url + "/" + patientId);
  }

  public edit(examinationId: number, medicalRecord: MedicalRecord) {
    return this.httpClient.put(this.url + "/" + examinationId, medicalRecord);
  }
}
