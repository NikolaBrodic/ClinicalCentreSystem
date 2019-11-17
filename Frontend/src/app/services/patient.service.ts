import { environment } from './../../environments/environment';
import { Patient } from './../models/patient';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constants';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  urlAuth = environment.baseUrl + environment.user;
  urlPatient = environment.baseUrl + environment.patient;

  constructor(
    private http: HttpClient
  ) { }

  public createPatient(patient) {
    return this.http.post(this.urlAuth + "/register", patient);
  }

  public getPatient(id) {
    return this.http.get<Patient>(this.urlPatient + "/" + id);
  }

  public getPatients() {
    return this.http.get<Patient[]>(this.urlPatient + "/all=patients");
  }

  public updatePatient(id, patient) {
    return this.http.put(this.urlPatient + "/" + id, patient);
  }

  public deletePatient(id) {
    return this.http.delete(this.urlPatient + "/" + id);
  }


}
