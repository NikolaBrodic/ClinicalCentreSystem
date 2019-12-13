import { environment } from './../../../environments/environment';
import { AddPredefinedExaminationComponent } from './../add-predefined-examination/add-predefined-examination.component';
import { Subscription } from 'rxjs';
import { ExaminationPagingDTO } from './../../models/examinations';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ExaminationService } from './../../services/examination.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Examination } from './../../models/examination';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-list-of-created-predefined-examination',
  templateUrl: './list-of-created-predefined-examination.component.html',
  styleUrls: ['./list-of-created-predefined-examination.component.css']
})
export class ListOfCreatedPredefinedExaminationComponent implements OnInit {

  examinationsDataSource: MatTableDataSource<Examination>;
  displayedColumns: string[] = ['date', 'time', 'examinationType', 'doctor', 'room', 'originalPrice', 'discountPrice', 'edit'];
  numberOfItem: number;
  expandedElement: Examination | null;
  successCreatedPredefinedExamination: Subscription;
  itemsPerPage = environment.itemsPerPage;

  constructor(public dialog: MatDialog, private examinationService: ExaminationService, private router: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getPredefinedExaminations();
    this.successCreatedPredefinedExamination = this.examinationService.successCreatedPredefinedExamination.subscribe(
      data => {
        this.getPredefinedExaminations();
      }
    );
  }

  getPredefinedExaminations() {
    this.examinationService.getCreatedPredefinedExaminations(this.paginator.pageIndex, 5, this.sort).subscribe((data: ExaminationPagingDTO) => {
      this.numberOfItem = data.numberOfItems;
      this.examinationsDataSource = new MatTableDataSource(data.examinationList);
      this.examinationsDataSource.sort = this.sort;
      this.examinationsDataSource.paginator = this.paginator;
    })
  }

  editPredefinedExamination() {

  }

  createPredefinedExamination() {
    this.dialog.open(AddPredefinedExaminationComponent);
  }
}
