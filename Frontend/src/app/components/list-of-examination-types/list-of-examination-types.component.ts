import { ExaminationTypeWithNumber } from './../../models/examinationTypewuthNumber';
import { ExaminationTypeService } from '../../services/examination-type.service';
import { ExaminationType } from '../../models/examinationType';
import { AddExaminationTypeComponent } from '../add-examination-type/add-examination-type.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-examination-types',
  templateUrl: './list-of-examination-types.component.html',
  styleUrls: ['./list-of-examination-types.component.css']
})
export class ListOfExaminationTypesComponent implements OnInit {
  examinationTypesDataSource: MatTableDataSource<ExaminationType>;
  displayedColumns: string[] = ['label', 'price', 'update', 'delete'];
  public searchString: string;
  filterInput: HTMLInputElement;
  private successCreatedType: Subscription;
  numberOfItem: number;

  constructor(public dialog: MatDialog,
    private examinationTypeService: ExaminationTypeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    // this.getExaminationTypesForAdmin();

    this.getExaminationTypesForAdminPaging(0, 5, null);
    this.successCreatedType = this.examinationTypeService.createSuccessEmitter.subscribe(
      data => {
        //this.getExaminationTypesForAdmin();
        this.getExaminationTypesForAdminPaging(this.paginator.pageIndex, this.paginator.pageSize, this.sort);
      }
    );
  }

  getExaminationTypesForAdmin() {
    this.filterInput = document.getElementById("filterInput") as HTMLInputElement;
    this.filterInput.value = "";
    this.examinationTypeService.getExaminationTypesForAdmin().subscribe(data => {
      this.examinationTypesDataSource = new MatTableDataSource(data);
      this.examinationTypesDataSource.sort = this.sort;
    })
  }
  openCreatingDialog() {
    this.dialog.open(AddExaminationTypeComponent);
  }

  applyFilter(filterValue: string) {
    this.examinationTypesDataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditingDialog() {

  }
  deleteType() {

  }
  sortEvent() {
    this.getExaminationTypesForAdminPaging(this.paginator.pageIndex, 5, this.sort);

  }
  getExaminationTypesForAdminPaging(pageIndex, pageSize, sort) {
    this.examinationTypeService.getExaminationTypesForAdminPaging(pageIndex, pageSize, sort).subscribe((data: ExaminationTypeWithNumber) => {
      this.numberOfItem = data.numberOfItems;
      this.examinationTypesDataSource = new MatTableDataSource(data.examinationTypes);
      this.examinationTypesDataSource.sort = this.sort;
    })
  }

  changePage() {
    this.getExaminationTypesForAdminPaging(this.paginator.pageIndex, 5, this.sort);
  }
}

