import { MatSort } from '@angular/material/sort';
import { environment } from './../../environments/environment';
import { Patient } from './../models/patient';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  urlAuth = environment.baseUrl + environment.user;
  urlPatient = environment.baseUrl + environment.patient;

  constructor(
    private httpClient: HttpClient
  ) { }

  public createPatient(patient) {
    return this.httpClient.post(this.urlAuth + "/register", patient);
  }

  public getPatient(id) {
    return this.httpClient.get<Patient>(this.urlPatient + "/" + id);
  }

  public getPatients() {
    return this.httpClient.get<Patient[]>(this.urlPatient + "/all=patients");
  }

  public updatePatient(id, patient) {
    return this.httpClient.put(this.urlPatient + "/" + id, patient);
  }

  public deletePatient(id) {
    return this.httpClient.delete(this.urlPatient + "/" + id);
  }

  public getPatientsForMedicalStaffPaging(pageIndex, pageSize, sort: MatSort, searchFirstName: string,
    searchLastName: string, searchHealthInsuranceID: string) {

    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    if (sort) {
      if (sort.active) {
        params = params.append('sort', sort.active + "," + sort.direction);
      }

    }
    params = params.append('firstName', searchFirstName);
    params = params.append('lastName', searchLastName);
    params = params.append('healthInsuranceId', searchHealthInsuranceID);
    return this.httpClient.get(this.urlPatient + "/pageAll", {
      params: params
    });
  }


}
