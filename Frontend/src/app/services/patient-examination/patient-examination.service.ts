import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientExaminationService {

  constructor(private http: HttpClient) { }

  public getIncomingExaminationsPatient() {
    return this.http.get(`http://localhost:8080/api/examination/getIncomingAppointments`)
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
  cancel(appId : any) {
    return this.http.delete("http://localhost:8080/api/examination/cancelAsPatient/" + appId)
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
}
