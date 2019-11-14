import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constants';
import { Patient } from '../components/register-patient/register-patient.component';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  constructor(
    private http: HttpClient
  ) { }

  public createPatient(patient) {
    return this.http.post(`${API_URL}/patient`, patient);
  }

  public getPatient(id) {
    return this.http.get<Patient>(`${API_URL}/patients/${id}`);
  }

  public getPatients() {
    return this.http.get<Patient[]>(`${API_URL}/patients`);
  }

  public updatePatient(id, patient) {
    return this.http.put(`${API_URL}/patients/${id}`, patient);
  }

  public deletePatient(id) {
    return this.http.delete(`${API_URL}/patients/${id}`);
  }

}
