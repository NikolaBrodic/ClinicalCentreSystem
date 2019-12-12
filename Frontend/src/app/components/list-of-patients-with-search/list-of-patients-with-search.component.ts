import { environment } from './../../../environments/environment';
import { PatientWithId } from './../../models/patientWithId';
import { PatientsWithNumberOffItmes } from './../../models/patientsWithNumberOffItmes';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { MatTableDataSource } from '@angular/material/table';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-of-patients-with-search',
  templateUrl: './list-of-patients-with-search.component.html',
  styleUrls: ['./list-of-patients-with-search.component.css']
})
export class ListOfPatientsWithSearchComponent implements OnInit {
  patientsDataSource: MatTableDataSource<PatientWithId>;
  displayedColumns: string[] = ['firstName', 'lastName', 'healthInsuranceId', 'link'];
  numberOfItem: number;
  searchFirstName: string = "";
  searchLastName: string = "";
  searchHealthInsuranceID: string = "";
  itemsPerPage = environment.itemsPerPage;

  constructor(private patientService: PatientService, private route: ActivatedRoute,
    private router: Router) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.getPatients(0);
  }


  sortEvent() {
    this.getPatients(0);
  }

  searchPatients() {
    this.getPatients(0);
  }

  viewPatientProfile(patient: PatientWithId) {
    this.router.navigate(['/patient/profile/' + patient.id]);
  }

  getPatients(pageIndex: number) {
    this.paginator.pageIndex = pageIndex;
    this.patientService.getPatientsForMedicalStaffPaging(pageIndex, 5, this.sort, this.searchFirstName, this.searchLastName,
      this.searchHealthInsuranceID).
      subscribe((data: PatientsWithNumberOffItmes) => {
        this.numberOfItem = data.numberOfItems;
        this.patientsDataSource = new MatTableDataSource(data.patientWithIdDTOS);
        this.patientsDataSource.sort = this.sort;
      })

  }

  changePage() {
    this.getPatients(this.paginator.pageIndex);
  }
}