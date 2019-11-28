import { ClinicService } from 'src/app/services/clinic.service';
import { environment } from './../../../environments/environment';

import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  clinicsDataSource: MatTableDataSource<Clinic>;
  displayedColumns: string[] = ['name', 'address', 'description'];
  numberOfItems: number;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private clinicService: ClinicService
  ) { }

  ngOnInit() {
    this.getClinics(0, this.itemsPerPage, null);
  }

  getClinics(pageIndex, pageSize, sort) {
    this.clinicService.getAllPatientClinics().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    // this.nurseService.getAllNursesInClinic(pageIndex, pageSize, sort).subscribe(
    //   (data: NursesWithNumberOfItems) => {
    //     this.numberOfItems = data.numberOfItems;
    //     this.nursesDataSource = new MatTableDataSource(data.nurses);
    //     this.nursesDataSource.sort = this.sort;
    //   });
  }

  changePage() {
    this.getClinics(this.paginator.pageIndex, this.itemsPerPage, this.sort);
  }

  sortEvent() {
    this.getClinics(this.paginator.pageIndex, this.itemsPerPage, this.sort);
  }

}
