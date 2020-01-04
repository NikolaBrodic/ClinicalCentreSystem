import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { environment } from './../../../environments/environment';
import { isUndefined } from 'util';
import { ExaminationTypeService } from '../../services/examination-type.service';
import { ExaminationType } from '../../models/examinationType';
import { AddExaminationTypeComponent } from '../add-examination-type/add-examination-type.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { EditExaminationTypeComponent } from '../edit/edit-examination-type/edit-examination-type.component';

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
  successEditedType: Subscription;
  numberOfItem: number;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    private examinationTypeService: ExaminationTypeService, private toastr: ToastrService) { }


  ngOnInit() {
    this.getExaminationTypesWithSearch("", "");
    this.successCreatedType = this.examinationTypeService.createSuccessEmitter.subscribe(
      () => {
        this.search();
      }
    );
    this.successEditedType = this.examinationTypeService.updateSuccessEmitter.subscribe(
      () => {
        this.search();
      }
    );
  }


  openCreatingDialog() {
    this.dialog.open(AddExaminationTypeComponent);
  }

  openEditingDialog(examinationType: ExaminationType) {
    this.dialog.open(EditExaminationTypeComponent, { data: examinationType });
  }

  deleteType(type: ExaminationType) {
    this.examinationTypeService.deleteType(type.id).subscribe(
      () => {
        this.search();
        this.toastr.success("Successfully deleted examination type.", 'Delete examination type');
      },
      () => {
        this.toastr.error("You can not delete this examination type because it is in use.",
          'Delete examination type');
      }
    );
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

