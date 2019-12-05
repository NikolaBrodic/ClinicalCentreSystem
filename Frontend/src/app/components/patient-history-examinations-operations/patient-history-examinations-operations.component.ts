import { PatientService } from 'src/app/services/patient.service';
import { ExaminationService } from './../../services/examination.service';
import { Examination } from './../../models/examination';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Nurse } from 'src/app/models/nurse';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { NurseService } from 'src/app/services/nurse.service';
import { NursesWithNumberOfItems } from 'src/app/models/nursesWithNumberOfItmes';
import { AddNurseComponent } from '../add-nurse/add-nurse.component';

@Component({
  selector: 'app-patient-history-examinations-operations',
  templateUrl: './patient-history-examinations-operations.component.html',
  styleUrls: ['./patient-history-examinations-operations.component.css']
})
export class PatientHistoryExaminationsOperationsComponent implements OnInit {

  examinationsDataSource: MatTableDataSource<Examination[]>;
  displayedColumns: string[] = ['kind', 'date', 'examinationType', 'clinicName', 'doctorFullName', 'price'];
  numberOfItems: number;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public patientService: PatientService
    ) { }

  ngOnInit() {
    this.getExaminationHistoryForPatient(0, this.itemsPerPage, null);
  }

  getExaminationHistoryForPatient(pageIndex, pageSize, sort) {
    this.patientService.getExaminationHistoryForPatient(1).subscribe(
      (data: Examination[]) => {
        this.numberOfItems = data.length;
        this.examinationsDataSource = new MatTableDataSource(data);
        this.examinationsDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    )
    // this.examinationService.getAllNursesInClinic(pageIndex, pageSize, sort).subscribe(
    //   (data: NursesWithNumberOfItems) => {
    //     this.numberOfItems = data.numberOfItems;
    //     this.nursesDataSource = new MatTableDataSource(data.nurses);
    //     this.nursesDataSource.sort = this.sort;
    //   });
  }

  changePage() {
    this.getExaminationHistoryForPatient(this.paginator.pageIndex, this.itemsPerPage, this.sort);
  }

  sortEvent() {
    this.getExaminationHistoryForPatient(this.paginator.pageIndex, this.itemsPerPage, this.sort);
  }

}
