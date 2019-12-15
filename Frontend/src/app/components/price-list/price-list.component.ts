import { ExaminationTypeService } from './../../services/examination-type.service';
import { isUndefined } from 'util';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from './../../../environments/environment';
import { ExaminationType } from './../../models/examinationType';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  examinationTypesDataSource: MatTableDataSource<ExaminationType>;
  displayedColumns: string[] = ['examinationType', 'price', 'update'];
  searchLabel: string;
  searchPrice: string;
  numberOfItem: number;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private examinationTypeService: ExaminationTypeService) { }


  ngOnInit() {
    this.getExaminationTypesWithSearch("", "");
  }

  openEditingDialog(examinationType: ExaminationType) {

  }

  getExaminationTypesWithSearch(searchLabel: string, searchPrice: any) {
    this.examinationTypeService.getExaminationTypesWithSearch(searchLabel, searchPrice).subscribe((data: ExaminationType[]) => {
      this.examinationTypesDataSource = new MatTableDataSource(data);
      this.examinationTypesDataSource.paginator = this.paginator;
      this.examinationTypesDataSource.sort = this.sort;
    })
  }

  search() {
    if (isUndefined(this.searchLabel) || !this.searchLabel) {
      this.searchLabel = "";
    }
    this.getExaminationTypesWithSearch(this.searchLabel, this.searchPrice);
  }
}
