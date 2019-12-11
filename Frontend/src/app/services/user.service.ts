import { map, catchError } from 'rxjs/operators';
import { LoggedInUser } from './../models/loggedInUser';
import { UserTokenState } from './../models/userTokenState';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserLoginRequest } from './../models/userLoginRequest';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseUrl + environment.user;
  private access_token = null;
  private req: UserTokenState
  public loggedInUserSubject: BehaviorSubject<LoggedInUser>;
  public loggedInUser: Observable<LoggedInUser>;
  loggedInSuccess: BehaviorSubject<LoggedInUser> = new BehaviorSubject<LoggedInUser>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loggedInUserSubject = new BehaviorSubject<LoggedInUser>(JSON.parse(localStorage.getItem('LoggedInUser')));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  changePassword(user: User) {
    return this.httpClient.put(this.url, user);
  }

  getLoggedInUser(): LoggedInUser {
    return this.loggedInUserSubject.value;
  }

  login(user: UserLoginRequest) {
    return this.httpClient.post(this.url + "/login", user).pipe(map((res: LoggedInUser) => {
      this.access_token = res.userTokenState.accessToken;
      localStorage.setItem('LoggedInUser', JSON.stringify(res));
      this.loggedInUserSubject.next(res);
    }));
  }

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

  logout() {
    this.access_token = null;
    localStorage.removeItem('LoggedInUser');
    this.router.navigate(['/user/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('LoggedInUser') !== null;
  }

  isClinicalCentreAdmin() {
    if (this.isLoggedIn()) {
      return this.loggedInUserSubject.value.role === "CLINICAL_CENTRE_ADMIN";
    }
  }

  isClinicAdmin() {
    if (this.isLoggedIn()) {
      return this.loggedInUserSubject.value.role === "CLINIC_ADMIN";
    }
  }

  isPatient() {
    if (this.isLoggedIn()) {
      return this.loggedInUserSubject.value.role === "PATIENT";
    }
  }

  isDoctor() {
    if (this.isLoggedIn()) {
      return this.loggedInUserSubject.value.role === "DOCTOR";
    }
  }

  isNurse() {
    if (this.isLoggedIn()) {
      return this.loggedInUserSubject.value.role === "NURSE";
    }
  }
}
