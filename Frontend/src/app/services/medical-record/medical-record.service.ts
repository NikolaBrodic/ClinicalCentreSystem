import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  constructor(private http: HttpClient) { }

  getMedicalRecordForPatient() {
    return this.http.get(`http://localhost:8080/api/medicalRecord/getMedicalRecord`)
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
