import { Examination } from './../../models/examination';
import { formatDate, Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ExaminationType } from 'src/app/models/examinationType';
import { Doctor } from 'src/app/models/doctor';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { PredefinedExamination } from 'src/app/models/predefinedExamination';
import { CreateExamination } from 'src/app/models/createExamination';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-doctor-add-examination-or-operation',
  templateUrl: './doctor-add-examination-or-operation.component.html',
  styleUrls: ['./doctor-add-examination-or-operation.component.css']
})
export class DoctorAddExaminationOrOperationComponent implements OnInit {

  doctorForm: FormGroup;
  dateTimeTypeForm: FormGroup;
  examinationTypes: ExaminationType[] = [];
  doctors: Doctor[] = [];
  minDate = new Date();
  timeError: boolean = false;
  isDoctorRequired = true;
  currentExamination: Examination;

  constructor(private toastr: ToastrService, private doctorService: DoctorService, private examinationTypeService: ExaminationTypeService,
    private location: Location, private examinationService: ExaminationService, public dialogRef: MatDialogRef<DoctorAddExaminationOrOperationComponent>) { }

  ngOnInit() {
    this.currentExamination = JSON.parse(localStorage.getItem('startingExamination'));;
    if (!this.currentExamination) {
      this.location.back();
      return;
    }

    this.minDate.setDate(this.minDate.getDate() + 1);
    this.dateTimeTypeForm = new FormGroup({
      kind: new FormControl(null, Validators.required),
      date: new FormControl(null, [Validators.required]),
      timeFrom: new FormControl(null, [Validators.required]),
      timeTo: new FormControl(null, [Validators.required]),
      examinationType: new FormControl(null, [Validators.required])
    });
    this.dateTimeTypeForm.patchValue(
      {
        'kind': "EXAMINATION",
      }
    );
    this.doctorForm = new FormGroup({
      doctor: new FormControl(null, [Validators.required])
    });

    this.getExaminationTypes();
  }

  changeKing() {
    if (this.dateTimeTypeForm.value.kind == "OPERATION") {
      this.isDoctorRequired = false;
    } else {
      this.isDoctorRequired = true;
    }
  }

  getExaminationTypes() {
    this.examinationTypeService.getExaminationTypesForAdmin().subscribe(data => {
      this.examinationTypes = data;
    })
  }

  getDoctors() {

    var examinationType = this.dateTimeTypeForm.value.examinationType;
    if (this.dateTimeTypeForm.value.date && this.dateTimeTypeForm.value.timeFrom && this.dateTimeTypeForm.value.timeTo) {
      var date = formatDate(this.dateTimeTypeForm.value.date, "yyyy-MM-dd", 'en-US')
      var startDateTime = date + " " + this.dateTimeTypeForm.value.timeFrom;
      var endDateTime = date + " " + this.dateTimeTypeForm.value.timeTo;
      this.doctorService.getAllAvailableDoctors(examinationType.id, startDateTime, endDateTime).subscribe((data: Doctor[]) => {
        this.doctors = data;
      })
    } else {
      this.doctors = [];
    }

  }
  next() {
    if (!(this.dateTimeTypeForm.value.timeFrom || this.dateTimeTypeForm.value.timeTo)) {
      this.timeError = true;
      return;
    }

    if (this.dateTimeTypeForm.value.timeFrom >= this.dateTimeTypeForm.value.timeTo) {
      this.timeError = true;
      return;
    }

    this.getDoctors();
  }

  create() {

    if (this.dateTimeTypeForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Create examination/operation');
      return;
    }

    if (this.isDoctorRequired && this.doctorForm.invalid) {
      this.toastr.error("Please choose a doctor.", 'Create examination/operation');
      return;
    }

    if (this.dateTimeTypeForm.value.timeFrom >= this.dateTimeTypeForm.value.timeTo) {
      this.toastr.error("Starting time must be before ending time.", 'Create examination');
      return;
    }

    var date = formatDate(this.dateTimeTypeForm.value.date, "yyyy-MM-dd", 'en-US')
    var startDateTime = date + " " + this.dateTimeTypeForm.value.timeFrom;
    var endDateTime = date + " " + this.dateTimeTypeForm.value.timeTo;

    var examination;
    if (this.isDoctorRequired) {
      examination = new CreateExamination(this.dateTimeTypeForm.value.kind, startDateTime, endDateTime, this.dateTimeTypeForm.value.examinationType,
        this.currentExamination.patient, this.doctorForm.value.doctor);
    } else {
      examination = new CreateExamination(this.dateTimeTypeForm.value.kind, startDateTime, endDateTime, this.dateTimeTypeForm.value.examinationType,
        this.currentExamination.patient);
    }

    this.examinationService.createExamination(examination).subscribe(
      responseData => {
        this.dateTimeTypeForm.reset();
        this.doctorForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully created a new examination/operation", 'Create examination');
      },
      message => {
        this.toastr.error("Error during creation of  examination/operation.", 'Create examination');
      }
    );
  }
}
