import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ExaminationReportResponse } from './../../models/examinationReportResponse';
import { ExaminationReportForTable } from './../../models/examinationReportForTable';
import { ExaminationReportService } from './../../services/examination-report.service';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-list-examination-reports-for-doctor',
  templateUrl: './list-examination-reports-for-doctor.component.html',
  styleUrls: ['./list-examination-reports-for-doctor.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListExaminationReportsForDoctorComponent implements OnInit {
  examinationReportsDataSource: MatTableDataSource<ExaminationReportForTable>;
  displayedColumns: string[] = ['timeCreated', 'diagnose', 'comment', 'medicinesList'];
  expandedElement: ExaminationReportForTable | null;

  @Input() patientId: number;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private examinationReportService: ExaminationReportService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit() {
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
      }/*,
      () => {
        this.toastr.error("You are not allowed to view this patient's medical record, because he/she wasn't your patient in the past.");
        this.location.back();
      }*/
    );
  }

}
