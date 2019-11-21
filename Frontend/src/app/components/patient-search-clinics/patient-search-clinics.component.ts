import { MatTableDataSource } from '@angular/material/table';
import { AddClinicComponent } from './../add-clinic/add-clinic.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Clinic } from 'src/app/models/clinic';
import { Subscription } from 'rxjs';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-patient-search-clinics',
  templateUrl: './patient-search-clinics.component.html',
  styleUrls: ['./patient-search-clinics.component.css']
})
export class PatientSearchClinicsComponent implements OnInit {

  clinicsDataSource: MatTableDataSource<Clinic>;
  displayedColumns: string[] = ['name', 'address'];

  constructor(
    public dialog: MatDialog,
    private clinicsService: ClinicService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.clinicsService.getAllClinics().subscribe(data => {
      this.clinicsDataSource = new MatTableDataSource(data);
    })
  }

}
