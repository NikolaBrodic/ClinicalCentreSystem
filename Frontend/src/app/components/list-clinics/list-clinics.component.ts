import { MatTableDataSource } from '@angular/material/table';
import { AddClinicComponent } from './../add-clinic/add-clinic.component';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openAddDialog() {
    this.dialog.open(AddClinicComponent);
  }

}
