import { Examination } from './../models/examination';
import { Router } from '@angular/router';
import { PatientWithId } from './../models/patientWithId';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { environment } from './../../environments/environment';
import { Patient } from './../models/patient';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Clinic } from '../models/clinic';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  urlAuth = environment.baseUrl + environment.user;
  urlPatient = environment.baseUrl + environment.patient;
  selectedPatient: PatientWithId;
  subjectForSelectedPatient = new BehaviorSubject<PatientWithId>(null);

  patientExaminationHistory: BehaviorSubject<Examination[]> = new BehaviorSubject<Examination[]>([]);
  filteredClinics: BehaviorSubject<Clinic[]> = new BehaviorSubject<Clinic[]>([]);
  filteredDoctors: BehaviorSubject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);
  allDoctors: BehaviorSubject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public createPatient(patient) {
    return this.httpClient.post(this.urlAuth + "/register", patient);
  }

  public getPatients() {
    return this.httpClient.get<Patient[]>(this.urlPatient + "/all=patients");
  }
  public getPatient(id: number) {
    return this.httpClient.get(this.urlPatient + "/" + id);
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

  public getExaminationHistoryForPatient(patientId): Observable<Examination[]> {
    this.httpClient.get(this.urlPatient + '/examination-history/' + patientId).subscribe(
      (data: Examination[]) => {
        this.patientExaminationHistory.next(data);
      },
      (error: HttpErrorResponse) => {
        
      }
    );
    return this.patientExaminationHistory.asObservable();
  }

  public getPatientForMedicalStaff(id: number) {
    return this.httpClient.get(this.urlPatient + "/forMedicalStaff/" + id);
  }

  public getFilteredClinicsByExamination(examination: Examination): Observable<Clinic[]> {
    this.httpClient.post(this.urlPatient + "/clinics-filter", examination).subscribe((data: Clinic[]) => {
      this.filteredClinics.next(data)
    },
    (error: HttpErrorResponse) => {

    });
    return this.filteredClinics.asObservable();
  }

  public getFilteredDoctors(doctor: Doctor): Observable<Doctor[]> {
    this.httpClient.post(this.urlPatient + "/choose-doctor", doctor).subscribe(
      (data: Doctor[]) => {
        this.filteredDoctors.next(data);
      },
      (error) => {

      }
    );
    return this.filteredDoctors.asObservable();
  }

  public getAllDoctorsInClinic(clinic: Clinic): Observable<Doctor[]> {
    this.httpClient.post(this.urlPatient + "/all-doctors", clinic).subscribe(
      (data: Doctor[]) => {
        this.allDoctors.next(data);
      },
      (error) => {

      }
    );
    return this.allDoctors.asObservable();
  }

}
