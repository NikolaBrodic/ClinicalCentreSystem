import { ExaminationService } from './../../services/examination.service';
import { ExaminationReportService } from './../../services/examination-report.service';
import { environment } from './../../../environments/environment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ExaminationReportForTable } from 'src/app/models/examinationReportForTable';
import { ExaminationReportResponse } from 'src/app/models/examinationReportResponse';
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

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private examinationReportService: ExaminationReportService,
    private examinationService: ExaminationService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.patientId = this.examinationService.choosenPatient.id;
    this.loggedInDoctorId = this.userService.getLoggedInUser().id;

    this.fetchData();
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

  editExaminationReportDialog(examinationReportId: number) {

  }

}
