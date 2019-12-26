import { ExaminationService } from 'src/app/services/examination.service';
import { Examination } from 'src/app/models/examination';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Doctor } from 'src/app/models/doctor';
import { Clinic } from 'src/app/models/clinic';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { PatientBookExaminationDialogComponent } from '../patient-book-examination-dialog/patient-book-examination-dialog.component';

@Component({
  selector: 'app-patient-available-examinations',
  templateUrl: './patient-available-examinations.component.html',
  styleUrls: ['./patient-available-examinations.component.css']
})
export class PatientAvailableExaminationsComponent implements OnInit {
  
  public patientAvailExaminationsDataSource: MatTableDataSource<Examination>;
  public displayedColumns: string[] = [
    'dateAndTime',
    'duration',
    'examinationType',
    'doctor',
    'room',
    'originalPrice',
    'discount',
    'newPrice',
    'linkToBook'
  ];
  
  public examination: Examination;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public examinationService: ExaminationService,
    public router: Router,
    ) { }

  ngOnInit() {
    this.getAllClinicsForPatient();
  }
  
  getAllClinicsForPatient() {
    this.examinationService.getCreatedPredefinedExaminations(1, 10, this.sort).subscribe(
      (data: Examination[]) => {
        this.patientAvailExaminationsDataSource = new MatTableDataSource(data);
        this.patientAvailExaminationsDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
