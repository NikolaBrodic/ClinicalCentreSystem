import { Clinic } from 'src/app/models/clinic';
import { PatientFilterClinics } from './../../models/patientFilterClinics';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { DateTimeInterval } from './../../models/dateTimeInterval';
import { Examination } from './../../models/examination';
import { DateTime } from 'luxon';
import { ClinicService } from 'src/app/services/clinic.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Doctor } from 'src/app/models/doctor';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { ExaminationType } from 'src/app/models/examinationType';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-patient-clinics',
  templateUrl: './patient-clinics.component.html',
  styleUrls: ['./patient-clinics.component.css']
})
export class PatientClinicsComponent implements OnInit {
  
  public patientClinicsDataSource: MatTableDataSource<Clinic>;
  public displayedColumns: string[] = ['options', 'name', 'clinicRating', 'address', 'id'];
  public selection = new SelectionModel<Clinic>(false, []);

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public selectedClinic: Clinic;

  private patientFilterClinics: PatientFilterClinics;

  public patientDoctorsDataSource: MatTableDataSource<Doctor>;
  public displayedColumnsDoctors: string[] = ['firstName', 'lastName', 'doctorRating', 'availableAt', 'id'];
  public doctorFirstName: string;
  public doctorLastName: string;
  public doctorRating: number;
  public doctor: Doctor;
  public clinic: Clinic;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public clinicService: ClinicService,
    public patientService: PatientService,
    public router: Router,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.getAllClinicsForPatient();

    // Filter clinics
    this.firstFormGroup = this._formBuilder.group({
      examinationDateCtrl: [''],
      examinationTypeCtrl: [''],
      clinicAddressCtrl: [''],
      clinicMinRatingCtrl: [''],
      examinationMaxPriceCtrl: [''],
    });

    // Filter doctors
    this.secondFormGroup = this._formBuilder.group({
      doctorFirstName: [''],
      doctorLastName: [''],
      doctorRating: [''],
    });
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
    this.patientFilterClinics = new PatientFilterClinics(
      this.firstFormGroup.get("examinationDateCtrl").value,
      this.firstFormGroup.get("examinationTypeCtrl").value,
      this.firstFormGroup.get("clinicAddressCtrl").value,
      +this.firstFormGroup.get("clinicMinRatingCtrl").value,
      +this.firstFormGroup.get("examinationMaxPriceCtrl").value,
    );

    // If the patient wants to use the search function to filter the clinics, he
    // must enter the examination date he wants and the examination type. Other
    // fields are optional.
    if (!this.patientFilterClinics.examinationDate) {
      this.toastr.error("You must enter the examination date.", "Error");
      return;
    }
    if (!this.patientFilterClinics.examinationType || this.patientFilterClinics.examinationType == "") {
      this.toastr.error("You must enter the examination type.", "Error");
      return;
    }

    this.populateFilteredTable();
  }

  populateFilteredTable() {
    this.patientService.getFilteredClinicsByExamination(this.patientFilterClinics).subscribe(
      (data) => {
        this.patientClinicsDataSource = new MatTableDataSource(data);
        this.patientClinicsDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.patientClinicsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.patientClinicsDataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Clinic): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    if (this.selection.isSelected(row)) {
      this.selectedClinic = row;
      console.log(this.selectedClinic);
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  clinicChosen() {
    this.getAllDoctorsInClinic();
  }
  
  getAllDoctorsInClinic() {
    this.patientService.getAllDoctorsInClinic(this.selectedClinic).subscribe(
      (data: Doctor[]) => {
        this.patientDoctorsDataSource = new MatTableDataSource(data);
        this.patientDoctorsDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
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
    this.populateFilteredTableDoctors();
  }

  populateFilteredTableDoctors() {
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

}
