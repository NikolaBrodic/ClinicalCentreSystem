import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Diagnose } from '../models/diagnose';

@Injectable({
  providedIn: 'root'
})
export class DiagnoseService {
  url = environment.baseUrl + environment.diagnose;

  diagnosis: BehaviorSubject<Diagnose[]> = new BehaviorSubject<Diagnose[]>([]);
  addSuccessEmitter = new Subject<Diagnose>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getAllDiagnosis(): Observable<Diagnose[]> {
    this.httpClient.get(this.url + "/all").subscribe((data: Diagnose[]) => {
      this.diagnosis.next(data)
    });
    return this.diagnosis.asObservable();
  }

  public add(diagnose: Diagnose) {
    return this.httpClient.post(this.url, diagnose);
  }
}
