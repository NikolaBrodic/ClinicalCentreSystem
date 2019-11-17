import { UserTokenState } from './../models/userTokenState';
import { UserLoginRequest } from './../models/userLoginRequest';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseUrl + environment.user;
  private access_token = null;

  constructor(private httpClient: HttpClient, private router: Router) { }

  changePassword(user: User) {
    return this.httpClient.put(this.url, user);
  }

  login(user: UserLoginRequest) {
    return this.httpClient.post(this.url + "/login", user).pipe(map((res: UserTokenState) => {
      this.access_token = res.accessToken;
    }));
  }

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }
}
