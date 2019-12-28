import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Prescription } from '../models/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  url = environment.baseUrl + environment.prescription;

  prescriptions: BehaviorSubject<Prescription[]> = new BehaviorSubject<Prescription[]>([]);
  stampPrescriptionSuccesEmitter = new Subject<Prescription>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getUnstampedPrescriptions(): Observable<Prescription[]> {
    this.httpClient.get(this.url + "/unstamped").subscribe((data: Prescription[]) => {
      this.prescriptions.next(data)
    });
    return this.prescriptions.asObservable();
  }

  public stamp(prescription: Prescription) {
    return this.httpClient.put(this.url, prescription);
  }
}
