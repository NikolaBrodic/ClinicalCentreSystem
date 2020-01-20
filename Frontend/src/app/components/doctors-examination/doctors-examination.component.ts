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
  displayedColumns: string[] = ['patient', 'examinationType', 'doctors', 'date', 'time', 'cancel'];
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
      this.toastr.error('First you need to chose examination', 'Assign room');
      this.router.navigate(['/clinical-centre-admin/examination/get-awaiting']);
    }

    this.examinationService.cancelExamination(examination).subscribe(
      () => {
        this.toastr.success('Successfully cancel scheduled examinaion', 'Cancel examination');
        this.getDoctorsExaminations();
      },
      () => {
        this.toastr.error('You can only cancel scheduled examination/operation that starts in more than 24 hours.',
          'Error during canceling examination/operation');
      }
    );
  }



}
