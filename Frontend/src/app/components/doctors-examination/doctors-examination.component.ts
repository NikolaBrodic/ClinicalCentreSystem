import { ToastrService } from 'ngx-toastr';
import { ExaminationPagingDTO } from './../../models/examinations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ExaminationService } from './../../services/examination.service';
import { MatTableDataSource } from '@angular/material/table';
import { Examination } from './../../models/examination';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-doctors-examination',
  templateUrl: './doctors-examination.component.html',
  styleUrls: ['./doctors-examination.component.css']
})
export class DoctorsExaminationComponent implements OnInit {
  examinationsDataSource: MatTableDataSource<Examination>;
  displayedColumns: string[] = ['patient', 'examinationType', 'doctors', 'interval', 'cancel'];
  numberOfItem: number;
  constructor(private examinationService: ExaminationService, private router: Router, private toastr: ToastrService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.getDoctorsExaminations();
  }

  getDoctorsExaminations() {
    this.examinationService.getDoctorsExaminations(this.paginator.pageIndex, 5, this.sort).subscribe((data: ExaminationPagingDTO) => {
      this.numberOfItem = data.numberOfItems;
      this.examinationsDataSource = new MatTableDataSource(data.examinationList);
      this.examinationsDataSource.sort = this.sort;
    })
  }

  cancel(examination: Examination) {
    if (!examination) {
      this.toastr.error("First you need to chose examination", 'Assign room');
      this.router.navigate(['/clinical-centre-admin/examination/get-awaiting']);
    }

    this.examinationService.cancelExamination(examination).subscribe(
      responseData => {
        this.toastr.success("Successfully cancel scheduled examinaion ", 'Cancel examination');
      },
      message => {
        this.toastr.error("You can cancel scheduled examination/operation only 24 hours before it is going to be held. ", 'Error during canceling examination/operation');
      }
    );
  }



}
