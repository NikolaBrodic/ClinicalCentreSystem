import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseUrl + environment.user;
  constructor(private httpClient: HttpClient, private router: Router) { }

  public changePassword(user: User) {
    return this.httpClient.put(this.url, user);
  }
}
