import { AddClinicalCentreAdminComponent } from './../add-clinical-centre-admin/add-clinical-centre-admin.component';
import { ClinicalCentreAdminService } from './../../services/clinical-centre-admin.service';
import { ClinicalCentreAdmin } from './../../models/clinicalCentreAdmin';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from './../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-clinical-centre-admins',
  templateUrl: './list-clinical-centre-admins.component.html',
  styleUrls: ['./list-clinical-centre-admins.component.css']
})
export class ListClinicalCentreAdminsComponent implements OnInit {
  clinicalCentreAdminsDataSource: MatTableDataSource<ClinicalCentreAdmin>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber'];
  itemsPerPage = environment.itemsPerPage;
  addClinicalCentreAdminSuccess: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private clinicalCentreAdminService: ClinicalCentreAdminService
  ) { }

  ngOnInit() {
    this.fetchData();

    this.addClinicalCentreAdminSuccess = this.clinicalCentreAdminService.addSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )
  }

  fetchData() {
    this.clinicalCentreAdminService.getAllClinicalCentreAdmins().subscribe(data => {
      this.clinicalCentreAdminsDataSource = new MatTableDataSource(data);
      this.clinicalCentreAdminsDataSource.paginator = this.paginator;
      this.clinicalCentreAdminsDataSource.sort = this.sort;
    });
  }

  openAddDialog() {
    this.dialog.open(AddClinicalCentreAdminComponent);
  }
}
