import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ExaminationType } from 'src/app/models/examinationType';
import { Doctor } from 'src/app/models/doctor';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-doctor-add-examination-or-operation',
  templateUrl: './doctor-add-examination-or-operation.component.html',
  styleUrls: ['./doctor-add-examination-or-operation.component.css']
})
export class DoctorAddExaminationOrOperationComponent implements OnInit {
  checked = false;
  doctorForm: FormGroup;
  dateTimeTypeForm: FormGroup;
  examinationTypes: ExaminationType[] = [];
  doctors: Doctor[] = [];
  minDate = new Date();
  timeError: boolean = false;
  isMultiple = false;
  constructor(private toastr: ToastrService, private doctorService: DoctorService, private examinationTypeService: ExaminationTypeService,
    private examinationService: ExaminationService) { }

  ngOnInit() {
    this.dateTimeTypeForm = new FormGroup({
      kind: new FormControl(null, Validators.required),
      date: new FormControl(null, [Validators.required]),
      timeFrom: new FormControl(null, [Validators.required]),
      timeTo: new FormControl(null, [Validators.required]),
      examinationType: new FormControl(null, [Validators.required])
    });

    this.doctorForm = new FormGroup({
      doctor: new FormControl(),
      doctors: new FormControl()
    });
    this.getExaminationTypes();
  }

  change() {
    this.checked = !this.checked;
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
    }

    if (this.dateTimeTypeForm.value.timeFrom >= this.dateTimeTypeForm.value.timeTo) {
      this.timeError = true;
    }

    this.getDoctors();
    if (this.dateTimeTypeForm.value.kind === "OPERATION") {
      this.isMultiple = true;
    } else {
      this.isMultiple = false;
    }
  }
}
