import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constants';
import { map } from 'rxjs/operators';

export const TOKEN = "token";
export const AUTHENTICATED_PATIENT = "authenticatedPatient";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  constructor(
    private http: HttpClient
  ) { }

  /* public executeJwtAuthenticationService(email, password) {
     return this.http.post<any>(
       `${API_URL}/authenticate`,
       {
         email,
         password
       }
     ).pipe(
       map(
         data => {
           sessionStorage.setItem(AUTHENTICATED_PATIENT, email);
           sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
           return data;
         }
       )
     );
   }*/

  /*
  public getAuthenticatedPatient() {
    return sessionStorage.getItem(AUTHENTICATED_PATIENT);
  }

  public getAuthenticatedToken() {
    if (this.getAuthenticatedPatient()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  public isPatientLoggedIn() {
    let patient = sessionStorage.getItem(AUTHENTICATED_PATIENT);
    return !(patient === null);
  }

  public logoutPatient() {
    sessionStorage.removeItem(AUTHENTICATED_PATIENT);
    sessionStorage.removeItem(TOKEN);
  }
*/
}
