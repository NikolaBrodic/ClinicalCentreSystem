import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PredefinedAppointmentsService {

  constructor(private http: HttpClient) { }

  getAllAvailablePredefined() {
    return this.http.get(`http://localhost:8080/api/examination/getAllPredefined`)
      .pipe(
        map((response: any) => {
          const data = response
          return data;
        }),
        catchError((err: any) => {
          return throwError(JSON.parse(err.text));
        })
      );
  }
  reservePredefAppointment(id : any) {
    return this.http.post(`http://localhost:8080/api/examination/reservePredef`,{
      id : id
    })
      .pipe(
        map((response: any) => {
          const data = response
          return data;
        }),
        catchError((err: any) => {
          return throwError(JSON.parse(err.text));
        })
      );
  }
}
