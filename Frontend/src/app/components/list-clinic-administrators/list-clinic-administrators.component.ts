import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from './../../../environments/environment';
import { AddClinicAdministratorComponent } from './../add-clinic-administrator/add-clinic-administrator.component';

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ClinicAdministrator } from 'src/app/models/clinicAdministrator';
import { Subscription } from 'rxjs';
import { ClinicAdministratorService } from 'src/app/services/clinic-administrator.service';
import { Clinic } from 'src/app/models/clinic';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-list-clinic-administrators',
  templateUrl: './list-clinic-administrators.component.html',
  styleUrls: ['./list-clinic-administrators.component.css']
})
export class ListClinicAdministratorsComponent implements OnInit {
  clinicAdminsDataSource: MatTableDataSource<ClinicAdministrator>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber'];
  clinics: Clinic[] = [];
  clinic: Clinic;
  clinicId0: Clinic;
  itemsPerPage = environment.itemsPerPage;
  addClinicAdminSuccess: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private clinicAdminService: ClinicAdministratorService,
    private clinicService: ClinicService) { }

  ngOnInit() {
    this.clinicId0 = new Clinic("All", "All", "All", 0);
    this.clinic = this.clinicId0;
    this.clinicService.getAllClinics().subscribe(
      data => {
        this.clinics = data;
      }
    );

    this.fetchData();

    this.addClinicAdminSuccess = this.clinicAdminService.addSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )
  }

  fetchData() {
    this.clinicAdminService.getAllClinicAdminsInClinic(this.clinic).subscribe(data => {
      this.clinicAdminsDataSource = new MatTableDataSource(data);
      this.clinicAdminsDataSource.paginator = this.paginator;
      this.clinicAdminsDataSource.sort = this.sort;
    });
  }

  openAddDialog() {
    this.dialog.open(AddClinicAdministratorComponent);
  }
}
