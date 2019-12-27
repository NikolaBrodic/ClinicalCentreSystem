import { ExaminationTypeService } from '../../services/examination-type.service';
import { Doctor } from './../../models/doctor';
import { DoctorService } from './../../services/doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { ExaminationType } from 'src/app/models/examinationType';
import { TimeValidator } from 'src/app/validators/time.validator';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})

export class AddDoctorComponent implements OnInit {
  addDoctorForm: FormGroup;
  specializations: ExaminationType[] = [];

  constructor(private toastr: ToastrService, private doctorService: DoctorService, private examinationTypeService: ExaminationTypeService,
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddDoctorComponent>) { }

  ngOnInit() {
    this.addDoctorForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
      workHoursFrom: new FormControl(null, [Validators.required]),
      workHoursTo: new FormControl(null, [Validators.required]),
      specialized: new FormControl(null, [Validators.required]),
    }, {
      validator: TimeValidator('workHoursFrom', 'workHoursTo')
    });

    this.getSpecializations();
  }

  getSpecializations() {
    this.examinationTypeService.getExaminationTypesForAdmin().subscribe((data) => {
      this.specializations = data;
    })
  }

  create() {

    if (this.addDoctorForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Add doctor');
      return;
    }

    const doctor = new Doctor(this.addDoctorForm.value.email, this.addDoctorForm.value.firstName,
      this.addDoctorForm.value.lastName, this.addDoctorForm.value.phoneNumber, this.addDoctorForm.value.workHoursFrom,
      this.addDoctorForm.value.workHoursTo, this.addDoctorForm.value.specialized);

    this.doctorService.create(doctor).subscribe(
      () => {
        this.toastr.success("Successfully created a new doctor.", 'Add doctor');
        this.addDoctorForm.reset();
        this.dialogRef.close();
        this.doctorService.createSuccessEmitter.next(doctor);
      },
      () => {
        this.toastr.error("Doctor with same email address or phone number already exists.", 'Add doctor');
      }
    );
  }

}
