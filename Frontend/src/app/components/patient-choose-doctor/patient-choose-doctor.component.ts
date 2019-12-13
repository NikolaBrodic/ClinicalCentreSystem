import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Clinic } from 'src/app/models/clinic';
import { DateTime } from 'luxon';
import { Examination } from 'src/app/models/examination';
import { ClinicService } from 'src/app/services/clinic.service';
import { PatientService } from 'src/app/services/patient.service';
import { DateTimeInterval } from 'src/app/models/dateTimeInterval';
import { ExaminationType } from 'src/app/models/examinationType';

@Component({
  selector: 'app-patient-choose-doctor',
  templateUrl: './patient-choose-doctor.component.html',
  styleUrls: ['./patient-choose-doctor.component.css']
})
export class PatientChooseDoctorComponent implements OnInit {
  
  public patientDoctorsDataSource: MatTableDataSource<Doctor>;
  public displayedColumns: string[] = ['firstName', 'lastName', 'doctorRating', 'availableAt', 'id'];
  
  public doctorFirstName: string;
  public doctorLastName: string;
  public doctorRating: number;
  public doctor: Doctor;
  public clinic: Clinic;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public patientService: PatientService,
    public router: Router,
    ) { }

  ngOnInit() {
    this.clinic = new Clinic(
      null,
      null,
      null,
      1,
    );
    this.getAllClinicsForPatient();
  }
  
  getAllClinicsForPatient() {
    this.patientService.getAllDoctorsInClinic(this.clinic).subscribe(
      (data: Doctor[]) => {
        this.patientDoctorsDataSource = new MatTableDataSource(data);
        this.patientDoctorsDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  applyFilter(filterValue: string) {
    this.patientDoctorsDataSource.filter = filterValue.trim().toLowerCase();
  }

  searchPatientDoctors() {
    this.doctor = new Doctor(
      null,
      this.doctorFirstName,
      this.doctorLastName,
      null,
      null,
      null,
      null,
      null,
      this.doctorRating
    );
    // console.log(this.examinationFilter.interval.startDateTime);
    // console.log(this.examinationFilter.examinationType.label);
    // console.log(this.examinationFilter.clinic.address);
    // console.log(this.examinationFilter.clinic.clinicRating);
    // console.log(this.examinationFilter.clinic.price);
    this.populateFilteredTable();
  }

  populateFilteredTable() {
    // Working example to send as a post request:
    /*
    [
      {
        "id": 6,
        "firstName": "Doca",
        "lastName": "Docic",
        "workHoursFrom": "05:00",
        "workHoursTo": "19:00",
        "email": "doca7@gmail.com",
        "password": "$2a$10$Hef/d2ZrMjGXUFE60xUVU.u0up/nV2cIJMg9GDevEgnv5cCcJpTpW",
        "specialized": {
            "id": 1,
            "label": "Ginekolog",
            "price": 5000.0,
            "status": "EXISTING"
        },
        "phoneNumber": "079256886",
        "doctorRating": null
      }
    ]
    */
    this.patientService.getFilteredDoctors(this.doctor).subscribe(
      (data) => {
        this.patientDoctorsDataSource = new MatTableDataSource(data);
        this.patientDoctorsDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchClinics() {
    this.router.navigate(['/patient/clinics']);
  }

  lastCheck() {

  }

}
