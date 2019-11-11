import { ExaminationTypeService } from './../../services/examination-type.service';
import { ExaminationType } from './../../models/examinationType';
import { AddExaminationTypeComponent } from './../add-examination-type/add-examination-type.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-lista-of-examination-types',
  templateUrl: './lista-of-examination-types.component.html',
  styleUrls: ['./lista-of-examination-types.component.css']
})
export class ListaOfExaminationTypesComponent implements OnInit {
  examinationTypesDataSource: MatTableDataSource<ExaminationType>;
  displayedColumns: string[] = ['label', 'price', 'update', 'delete'];
  public searchString: string;
  filterInput: HTMLInputElement;
  private successCreatedType: Subscription;

  constructor(public dialog: MatDialog,
    private examinationTypeService: ExaminationTypeService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getExaminationTypesForAdmin();

    this.successCreatedType = this.examinationTypeService.createSuccessEmitter.subscribe(
      data => {
        this.getExaminationTypesForAdmin();
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
}

