import { Location } from '@angular/common';
import { ExaminationReportResponse } from './../../models/examinationReportResponse';
import { ExaminationReportForTable } from './../../models/examinationReportForTable';
import { EditExaminationReportComponent } from './../edit/edit-examination-report/edit-examination-report.component';
import { ExaminationService } from './../../services/examination.service';
import { ExaminationReportService } from './../../services/examination-report.service';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-examination-reports',
  templateUrl: './list-examination-reports.component.html',
  styleUrls: ['./list-examination-reports.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListExaminationReportsComponent implements OnInit {
  examinationReportsDataSource: MatTableDataSource<ExaminationReportForTable>;
  displayedColumns: string[] = ['timeCreated', 'diagnose', 'comment', 'medicinesList', 'edit'];
  expandedElement: ExaminationReportForTable | null;
  patientId: number;
  loggedInDoctorId: number;
  editExaminationReportSuccess: Subscription

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private examinationReportService: ExaminationReportService,
    private examinationService: ExaminationService,
    private userService: UserService,
    public dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit() {

    const currentExamination = JSON.parse(localStorage.getItem('startingExamination'));
    if (!currentExamination) {
      this.location.back();
      return;
    }
    this.patientId = currentExamination.patient.id;
    this.loggedInDoctorId = this.userService.getLoggedInUser().id;

    this.fetchData();

    this.editExaminationReportSuccess = this.examinationReportService.editSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )
  }

  fetchData() {

    this.examinationReportService.getPatientsExaminationReports(this.patientId).subscribe(
      (data: ExaminationReportResponse[]) => {
        let examinationReportsForTable: ExaminationReportForTable[] = [];
        data.forEach(function (element) {
          examinationReportsForTable.push(new ExaminationReportForTable(element));
        })
        this.examinationReportsDataSource = new MatTableDataSource(examinationReportsForTable);
        this.examinationReportsDataSource.sort = this.sort;
      });
  }

  editExaminationReportDialog(examinationReport: ExaminationReportForTable, event) {
    event.stopPropagation();
    this.dialog.open(EditExaminationReportComponent, { data: examinationReport });
  }

}
