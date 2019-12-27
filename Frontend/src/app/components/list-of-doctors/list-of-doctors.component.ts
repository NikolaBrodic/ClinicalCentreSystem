import { environment } from './../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from './../../services/doctor.service';
import { Doctor } from './../../models/doctor';
import { AddDoctorComponent } from './../add-doctor/add-doctor.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  searchString: string;
  searchFirstName: string = "";
  searchLastName: string = "";
  searchSpecializedFor: string = "";
  itemsPerPage = environment.itemsPerPage;
  successCreatedDoctor: Subscription;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public doctorService: DoctorService,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.getDoctorsForAdmin();

    this.successCreatedDoctor = this.doctorService.createSuccessEmitter.subscribe(
      () => {
        this.getDoctorsForAdmin();
      }
    );
  }

  getDoctorsForAdmin() {
    this.doctorService.getAllDoctorsForAdmin().subscribe(data => {
      this.doctorsDataSource = new MatTableDataSource(data);
      this.doctorsDataSource.sort = this.sort;
      this.doctorsDataSource.paginator = this.paginator;
    })
  }

  search() {
    this.doctorService.searchDoctorsForAdminRequest(this.searchFirstName, this.searchLastName, this.searchSpecializedFor).subscribe(data => {
      this.doctorsDataSource = new MatTableDataSource(data);
      this.doctorsDataSource.sort = this.sort;
      this.doctorsDataSource.paginator = this.paginator;
    })
  }
  openCreatingDialog() {
    this.dialog.open(AddDoctorComponent);
  }

  applyFilter(filterValue: string) {
    this.doctorsDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDoctor(doctor: Doctor) {

    this.doctorService.deleteDoctor(doctor.id).subscribe(
      () => {
        this.getDoctorsForAdmin();
        this.toastr.success("Successfully deleted doctor.", 'Delete doctor');
      },
      () => {
        this.toastr.error("You can not delete this doctor because he has upcoming appointments.", 'Delete doctor');
      }
    );
  }

}
