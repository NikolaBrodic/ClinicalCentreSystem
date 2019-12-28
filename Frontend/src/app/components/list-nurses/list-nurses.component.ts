import { environment } from './../../../environments/environment';
import { NurseService } from './../../services/nurse.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Nurse } from 'src/app/models/nurse';
import { NursesWithNumberOfItems } from 'src/app/models/nursesWithNumberOfItmes';
import { Subscription } from 'rxjs';
import { AddNurseComponent } from '../add-nurse/add-nurse.component';

@Component({
  selector: 'app-list-nurses',
  templateUrl: './list-nurses.component.html',
  styleUrls: ['./list-nurses.component.css']
})
export class ListNursesComponent implements OnInit {

  nursesDataSource: MatTableDataSource<Nurse>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'workhours'];
  numberOfItems: number;
  itemsPerPage = environment.itemsPerPage;
  addNurseSuccess: Subscription;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private nurseService: NurseService) { }

  ngOnInit() {
    this.getNursesInClinic(0, this.itemsPerPage, null);

    this.addNurseSuccess = this.nurseService.addSuccessEmitter.subscribe(
      (data) => {
        this.getNursesInClinic(this.paginator.pageIndex, this.paginator.pageSize, this.sort);
      }
    )
  }

  getNursesInClinic(pageIndex, pageSize, sort) {
    this.nurseService.getAllNursesInClinic(pageIndex, pageSize, sort).subscribe(
      (data: NursesWithNumberOfItems) => {
        this.numberOfItems = data.numberOfItems;
        this.nursesDataSource = new MatTableDataSource(data.nurses);
        this.nursesDataSource.sort = this.sort;
      });
  }

  changePage() {
    this.getNursesInClinic(this.paginator.pageIndex, this.itemsPerPage, this.sort);
  }

  sortEvent() {
    this.getNursesInClinic(this.paginator.pageIndex, this.itemsPerPage, this.sort);
  }

  openAddDialog() {
    this.dialog.open(AddNurseComponent);
  }

}
