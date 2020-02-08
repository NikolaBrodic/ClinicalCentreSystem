import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientInformationService {

  constructor(private http: HttpClient) { }

  getPatientInformation() {
    return this.http.get(`http://localhost:8080/api/patient/getInformation`)
      .pipe(
        map((response: any) => {
          const data = response
          return data;
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }
  updatePatient(
    firstName: string,
    lastName: string,
    phoneNumber : string,
    address: string,
    city : string,
    country : string,
  ) {
    
    return this.http.post("http://localhost:8080/api/patient/updateInformations", {
      firstName :firstName,
      lastName : lastName,
      phoneNumber :phoneNumber,
      address : address,
      city : city,
      country : country

    })
      .pipe(
        map((response: any) => {
          console.log('dosao nazad')
          const data = response
          return data;
        }),
        catchError((err: any) => {
          return throwError(JSON.parse(err.text));
        })
      )
  }
}
