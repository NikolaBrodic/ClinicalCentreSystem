import { ToastrService } from 'ngx-toastr';
import { DoctorService } from './../../services/doctor.service';
import { Doctor } from './../../models/doctor';
import { AddDoctorComponent } from './../add-doctor/add-doctor.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-of-doctors',
  templateUrl: './list-of-doctors.component.html',
  styleUrls: ['./list-of-doctors.component.css']
})
export class ListOfDoctorsComponent implements OnInit {
  doctorsDataSource: MatTableDataSource<Doctor>;
  displayedColumns: string[] = ['firstName', 'lastName', 'specializedfor', 'workhours', 'delete'];
  public searchString: string;
  filterInput: HTMLInputElement;
  private successCreatedDoctor: Subscription;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, public doctorService: DoctorService,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.getDoctorsForAdmin();

    this.successCreatedDoctor = this.doctorService.createSuccessEmitter.subscribe(
      data => {
        this.getDoctorsForAdmin();
      }
    );
  }

  getDoctorsForAdmin() {
    this.filterInput = document.getElementById("filterInput") as HTMLInputElement;
    this.filterInput.value = "";
    this.doctorService.getAllDoctorsForAdmin().subscribe(data => {
      this.doctorsDataSource = new MatTableDataSource(data);
      this.doctorsDataSource.sort = this.sort;
    })
  }

  openCreatingDialog() {
    this.dialog.open(AddDoctorComponent);
  }

  applyFilter(filterValue: string) {
    this.doctorsDataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditingDialog() {

  }

  deleteDoctor(doctor: Doctor) {

    this.doctorService.deleteDoctor(doctor.id).subscribe(
      responseData => {
        this.getDoctorsForAdmin();
        this.toastr.success("Successfully deleted doctor.", 'Delete doctor');
      },
      message => {
        this.toastr.error("You can not delete this doctor because he has upcoming appointments.", 'Delete doctor');
      }
    );
  }

}
