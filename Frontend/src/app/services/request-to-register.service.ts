import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestToRegister } from '../models/request-to-register';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestToRegisterService {
  url = environment.baseUrl + environment.clinicalCentreAdmin;

  requestsToRegister: BehaviorSubject<RequestToRegister[]> = new BehaviorSubject<RequestToRegister[]>([]);

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getRequestsToRegister(): Observable<RequestToRegister[]> {
    this.httpClient.get(this.url + "/all-requests-to-register").subscribe(
      (data: RequestToRegister[]) => {
        this.requestsToRegister.next(data);
      },
      (error: HttpErrorResponse) => {

      });

    return this.requestsToRegister.asObservable();
  }
}
