import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradingService {

  constructor(private http: HttpClient) { }

  getDoctors(patientId:any){
    return this.http.get("http://localhost:8080/api/grading/doctorGrade").pipe(
      map((response: any) => {
        const data = response;
        return data;
      }),
      catchError((err: any) => {
        return throwError(JSON.parse(err.text));
      })
    )  
  }
  getClinics(patientId:any){
    return this.http.get("http://localhost:8080/api/grading/clinicGrade").pipe(
      map((response: any) => {
        const data = response;
        return data;
      }),
      catchError((err: any) => {
        return throwError(JSON.parse(err.text));
      })
    )  
  }
  makeGradeClinic(clinicName:String,value:any,patientId:any){
    return this.http.post("http://localhost:8080/api/grading/makeGradeClinic", {
      clinicName:clinicName,
      value:value,
      patientId:patientId
  }).pipe(
      map((response: any) => {
        const data = response;
        return data;
      }),
      catchError((err: any) => {
        return throwError(JSON.parse(err.text));
      })
    )  
  }
  makeGradeDoctor(doctorId:any,value:any,patientId:any){
    return this.http.post("http://localhost:8080/api/grading/makeGradeDoctor", {
      doctorId:doctorId,
      value:value,
      patientId:patientId
  }).pipe(
      map((response: any) => {
        const data = response;
        return data;
      }),
      catchError((err: any) => {
        return throwError(JSON.parse(err.text));
      })
    )  
  }
}
