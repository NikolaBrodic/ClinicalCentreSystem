import { environment } from './../../../environments/environment';
import { isUndefined } from 'util';
import { ExaminationTypeWithNumber } from './../../models/examinationTypewuthNumber';
import { ExaminationTypeService } from '../../services/examination-type.service';
import { ExaminationType } from '../../models/examinationType';
import { AddExaminationTypeComponent } from '../add-examination-type/add-examination-type.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

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
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
      this.examinationTypesDataSource.paginator = this.paginator;
    })
  }

  search() {
    if (isUndefined(this.searchLabel) || !this.searchLabel) {
      this.searchLabel = "";
    }
    this.getExaminationTypesWithSearch(this.searchLabel, this.searchPrice);
  }
}

