import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Clinic } from '../models/clinic';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  url = environment.baseUrl + environment.clinic;

  clinics: BehaviorSubject<Clinic[]> = new BehaviorSubject<Clinic[]>([]);
  addSuccessEmitter = new Subject<Clinic>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public add(clinic: Clinic) {
    return this.httpClient.post(this.url, clinic);
  }
}
