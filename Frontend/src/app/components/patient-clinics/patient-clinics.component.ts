import { PatientService } from 'src/app/services/patient.service';
import { DateTimeInterval } from './../../models/dateTimeInterval';
import { Examination } from './../../models/examination';
import { DateTime } from 'luxon';
import { ClinicService } from 'src/app/services/clinic.service';
import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Doctor } from 'src/app/models/doctor';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { ExaminationType } from 'src/app/models/examinationType';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';

@Component({
  selector: 'app-patient-clinics',
  templateUrl: './patient-clinics.component.html',
  styleUrls: ['./patient-clinics.component.css']
})
export class PatientClinicsComponent implements OnInit {
  
  public patientClinicsDataSource: MatTableDataSource<Clinic>;
  public displayedColumns: string[] = ['name', 'clinicRating', 'address', 'id'];
  
  public examinationDate: DateTime;
  public examinationType: string;
  public examinationAddress: string;
  public examinationMinClinicsRating: number;
  public examinationMaxPrice: number;

  private examinationFilter: Examination;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public clinicService: ClinicService,
    public patientService: PatientService,
    ) { }

  ngOnInit() {
    this.getAllClinicsForPatient();
  }
  
  getAllClinicsForPatient() {
    this.clinicService.getAllClinics().subscribe(
      (data) => {
        this.patientClinicsDataSource = new MatTableDataSource(data);
        this.patientClinicsDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  applyFilter(filterValue: string) {
    this.patientClinicsDataSource.filter = filterValue.trim().toLowerCase();
  }

  searchPatientClinics() {
    this.examinationFilter = new Examination(
      1,
      null,
      new DateTimeInterval(null, this.examinationDate, this.examinationDate),
      null,
      new ExaminationType(this.examinationType, null),
      null,
      null,
      null,
      null,
      null,
      new Clinic(null, this.examinationAddress, null, null, this.examinationMinClinicsRating, this.examinationMaxPrice)
    )
    console.log(this.examinationFilter.interval.startDateTime);
    console.log(this.examinationFilter.examinationType.label);
    console.log(this.examinationFilter.clinic.address);
    console.log(this.examinationFilter.clinic.clinicRating);
    console.log(this.examinationFilter.clinic.price);
    this.populateFilteredTable();
  }

  populateFilteredTable() {
    // Working example to send as a post request:
    /*
    {
      "id": 1,
      "interval": {
          "startDateTime": "2019-12-12 09:00",
          "endDateTime": "2019-12-12 10:00"
      },
      "examinationType": {
          "label": "Ginekolog",
          "price": 5000.0
      },
      "clinic": {
          "address": "3.Oktobar 73",
          "clinicRating": 0
      }
    }
    */
    this.patientService.getFilteredClinicsByExamination(this.examinationFilter).subscribe(
      (data) => {
        this.patientClinicsDataSource = new MatTableDataSource(data);
        this.patientClinicsDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
