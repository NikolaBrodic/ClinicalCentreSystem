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
  public searchString: string;
  public filterInput: HTMLInputElement;
  public clinic: Clinic;
  public examinationType: ExaminationType;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public clinicService: ClinicService,
    ) { }

  ngOnInit() {
    this.getAllClinicsForPatient();
  }
  
  getAllClinicsForPatient() {
    this.filterInput = document.getElementById("filterInput") as HTMLInputElement;
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

  }

}
