import { environment } from './../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddClinicComponent } from '../add-clinic/add-clinic.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Clinic } from 'src/app/models/clinic';
import { Subscription } from 'rxjs';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-list-clinics',
  templateUrl: './list-clinics.component.html',
  styleUrls: ['./list-clinics.component.css']
})
export class ListClinicsComponent implements OnInit {

  clinicsDataSource: MatTableDataSource<Clinic>;
  displayedColumns: string[] = ['name', 'address'];
  addClinicSuccess: Subscription;
  itemsPerPage = environment.itemsPerPage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private clinicsService: ClinicService
  ) { }

  ngOnInit() {
    this.fetchData();

    this.addClinicSuccess = this.clinicsService.addSuccessEmitter.subscribe(
      () => {
        this.fetchData();
      }
    )
  }

  openAddDialog() {
    this.dialog.open(AddClinicComponent);
  }

  fetchData() {
    this.clinicsService.getAllClinics().subscribe(data => {
      this.clinicsDataSource = new MatTableDataSource(data);
      this.clinicsDataSource.paginator = this.paginator;
    })
  }

}
