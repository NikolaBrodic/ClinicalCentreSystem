import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RequestToRegister } from '../models/request-to-register';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestToRegisterService {
  url = environment.baseUrl + environment.patient;

  requestsToRegister: BehaviorSubject<RequestToRegister[]> = new BehaviorSubject<RequestToRegister[]>([]);
  rejectSuccessEmitter = new Subject<RequestToRegister>();
  approveSuccessEmitter = new Subject<RequestToRegister>();

  constructor(private httpClient: HttpClient) { }

  public getRequestsToRegister() {
    return this.httpClient.get(this.url + "/all-requests-to-register");
  }

  public reject(id: number, reason: string) {
    return this.httpClient.put(this.url + "/reject-request-to-register/" + id, reason);
  }

  public approve(requestToRegister: RequestToRegister) {
    return this.httpClient.put(this.url + "/approve-request-to-register/" + requestToRegister.id, requestToRegister);
  }
}
