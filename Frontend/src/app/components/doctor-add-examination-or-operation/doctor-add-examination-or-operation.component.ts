import { CreateExamination } from './../../models/createExamination';
import { ExaminationService } from './../../services/examination.service';
import { DoctorService } from './../../services/doctor.service';
import { ExaminationTypeService } from './../../services/examination-type.service';
import { ToastrService } from 'ngx-toastr';
import { Examination } from './../../models/examination';
import { formatDate, Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ExaminationType } from '../../models/examinationType';
import { Doctor } from '../../models/doctor';

const TimeVal: ValidatorFn = (fg: FormGroup) => {
  const from = fg.get('timeFrom').value;
  const to = fg.get('timeTo').value;
  if (!from || !to) {
    return null;
  }
  return from !== null && to !== null && from < to
    ? null
    : { timeError: true };
};
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
  timeError = false;
  isDoctorRequired = true;
  currentExamination: Examination;

  constructor(private toastr: ToastrService, private doctorService: DoctorService, private examinationTypeService: ExaminationTypeService, private formBuilder: FormBuilder,
    private location: Location, private examinationService: ExaminationService, public dialogRef: MatDialogRef<DoctorAddExaminationOrOperationComponent>) {

  }

  ngOnInit() {

    this.currentExamination = JSON.parse(localStorage.getItem('startingExamination'));
    if (!this.currentExamination) {
      this.location.back();
      return;
    }

    this.minDate.setDate(this.minDate.getDate() + 1);

    this.dateTimeTypeForm = this.formBuilder.group({
      kind: new FormControl(null, Validators.required),
      date: new FormControl(null, [Validators.required]),
      timeFrom: new FormControl(null, [Validators.required]),
      timeTo: new FormControl(null, [Validators.required]),
      examinationType: new FormControl(null, [Validators.required])
    }, {
      validator: [TimeVal]
    });
    this.dateTimeTypeForm.patchValue(
      {
        'kind': 'EXAMINATION'
      }
    );
    this.doctorForm = new FormGroup({
      doctor: new FormControl(null, [Validators.required])
    });

    this.getExaminationTypes();
  }

  changeKind(): any {

    if (this.dateTimeTypeForm.value.kind === 'OPERATION') {
      this.isDoctorRequired = false;
    } else {
      this.isDoctorRequired = true;
    }
  }

  getExaminationTypes(): any {

    this.examinationTypeService.getExaminationTypesForAdmin().subscribe((data) => {
      this.examinationTypes = data;
    })
  }

  getDoctors(): any {

    const examinationType = this.dateTimeTypeForm.value.examinationType;
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

  next(): void {

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

  create(): void {

    if (this.dateTimeTypeForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Create examination/operation');
      return;
    }

    if (this.isDoctorRequired && this.doctorForm.invalid) {
      this.toastr.error("Please choose a doctor.", 'Create examination/operation');
      return;
    }

    var date = formatDate(this.dateTimeTypeForm.value.date, "yyyy-MM-dd", 'en-US');
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
