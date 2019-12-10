import { isUndefined } from 'util';
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
  searchLabel: string;
  searchPrice: string;
  successCreatedType: Subscription;
  numberOfItem: number;

  constructor(public dialog: MatDialog,
    private examinationTypeService: ExaminationTypeService) { }


  ngOnInit() {
    this.getExaminationTypesWithSearch("", "");
    this.successCreatedType = this.examinationTypeService.createSuccessEmitter.subscribe(
      data => {
        this.search();
      }
    );
  }


  openCreatingDialog() {
    this.dialog.open(AddExaminationTypeComponent);
  }

  openEditingDialog() {

  }
  deleteType() {

  }

  getExaminationTypesWithSearch(searchLabel: string, searchPrice: any) {
    this.examinationTypeService.getExaminationTypesWithSearch(searchLabel, searchPrice).subscribe((data: ExaminationType[]) => {
      this.examinationTypesDataSource = new MatTableDataSource(data);
    })
  }

  search() {
    if (isUndefined(this.searchLabel) || !this.searchLabel) {
      this.searchLabel = "";
    }
    this.getExaminationTypesWithSearch(this.searchLabel, this.searchPrice);
  }
}

