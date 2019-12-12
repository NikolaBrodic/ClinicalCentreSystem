import { ExaminationTypeService } from './../../services/examination-type.service';
import { Doctor } from './../../models/doctor';
import { DoctorService } from './../../services/doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { ExaminationType } from 'src/app/models/examinationType';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})

export class AddDoctorComponent implements OnInit {
  addDoctorForm: FormGroup;
  specializations: ExaminationType[] = [];

  constructor(private toastr: ToastrService, private doctorService: DoctorService, private examinationTypeService: ExaminationTypeService,
    public dialogRef: MatDialogRef<AddDoctorComponent>) { }

  ngOnInit() {

    this.addDoctorForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
      workHoursFrom: new FormControl(null, [Validators.required]),
      workHoursTo: new FormControl(null, [Validators.required]),
      specialized: new FormControl(null, [Validators.required]),
    });

    this.getSpecializations();
  }

  getSpecializations() {
    this.examinationTypeService.getExaminationTypesForAdmin().subscribe(data => {
      this.specializations = data;
    })
  }

  create() {

    if (this.addDoctorForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Add doctor');
      return;
    }
    if (this.addDoctorForm.value.workHoursFrom >= this.addDoctorForm.value.workHoursTo) {
      this.toastr.error("Starting work hours must be before ending work hours.", 'Add doctor');
      return;
    }

    const doctor = new Doctor(this.addDoctorForm.value.email, this.addDoctorForm.value.firstName,
      this.addDoctorForm.value.lastName, this.addDoctorForm.value.phoneNumber, this.addDoctorForm.value.workHoursFrom,
      this.addDoctorForm.value.workHoursTo, this.addDoctorForm.value.specialized);

    this.doctorService.create(doctor).subscribe(
      responseData => {
        this.toastr.success("Successfully created a new doctor.", 'Add doctor');
        this.addDoctorForm.reset();
        this.dialogRef.close();
        this.doctorService.createSuccessEmitter.next(doctor);
      },
      message => {
        this.toastr.error("Doctor with same email address or phone number already exists.", 'Add doctor');
      }
    );
  }

}
