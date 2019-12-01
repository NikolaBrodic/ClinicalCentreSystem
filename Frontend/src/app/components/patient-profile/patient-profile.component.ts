import { Examination } from './../../models/examination';
import { ExaminationService } from './../../services/examination.service';
import { ClinicService } from 'src/app/services/clinic.service';
import { environment } from './../../../environments/environment';

import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  clinicsDataSource: MatTableDataSource<Clinic>;
  displayedColumns: string[] = ['name', 'description', 'address'];

  examinationsDataSource: MatTableDataSource<Examination>;
  // displayedColumnsExamination: string[] = ['kind', 'interval', 'status', 'examinationType', 'doctors', 'room', 'discount']
  displayedColumnsExamination: string[] = ['kind', 'interval'];

  numberOfItems: number;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private clinicService: ClinicService,
    private examinationService: ExaminationService
  ) { }
  
  ngOnInit() {
    this.getClinics(0, this.itemsPerPage, null);
    this.getHistoryOfExaminations(0, this.itemsPerPage, null);
  }

  getClinics(pageIndex, pageSize, sort) {
    this.clinicService.getAllPatientClinics().subscribe(
      (data: Clinic[]) => {
        this.clinicsDataSource = new MatTableDataSource(data);
        this.clinicsDataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }

  getHistoryOfExaminations(pageIndex, pageSize, sort) {
    this.examinationService.getAllExaminationsForPatient().subscribe(
      (data: Examination[]) => {
        this.examinationsDataSource = new MatTableDataSource(data);
        this.examinationsDataSource.sort = this.sort;
        console.log(data);
      },
      error => {
      }
    )
  }

  changePage() {
    this.getClinics(this.paginator.pageIndex, this.itemsPerPage, this.sort);
  }

  sortEvent() {
    this.getClinics(this.paginator.pageIndex, this.itemsPerPage, this.sort);
  }

}
