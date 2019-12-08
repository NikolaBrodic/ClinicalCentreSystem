import { formatDate } from '@angular/common';
import { PredefinedExamination } from './../../models/predefinedExamination';
import { RoomService } from './../../services/room.service';
import { DateTime } from 'luxon';
import { ExaminationService } from 'src/app/services/examination.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ExaminationTypeService } from './../../services/examination-type.service';
import { DoctorService } from './../../services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Room } from './../../models/room';
import { Doctor } from './../../models/doctor';
import { ExaminationType } from './../../models/examinationType';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-predefined-examination',
  templateUrl: './add-predefined-examination.component.html',
  styleUrls: ['./add-predefined-examination.component.css']
})
export class AddPredefinedExaminationComponent implements OnInit {

  addPredefinedExaminationForm: FormGroup;
  dateTimeTypeForm: FormGroup;
  examinationTypes: ExaminationType[] = [];
  doctors: Doctor[] = [];
  rooms: Room[] = [];
  minDate = new Date();
  timeError: boolean = false;

  constructor(private toastr: ToastrService, private doctorService: DoctorService, private examinationTypeService: ExaminationTypeService,
    private examinationService: ExaminationService, private roomService: RoomService,
    public dialogRef: MatDialogRef<AddPredefinedExaminationComponent>) { }

  ngOnInit() {
    this.dateTimeTypeForm = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      timeFrom: new FormControl(null, [Validators.required]),
      timeTo: new FormControl(null, [Validators.required]),
      examinationType: new FormControl(null, [Validators.required])
    });

    this.addPredefinedExaminationForm = new FormGroup({
      doctor: new FormControl(null, [Validators.required]),
      room: new FormControl(null, [Validators.required]),
      discount: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(99)])
    });
    this.getExaminationTypes();
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

  getRooms() {
    if (this.dateTimeTypeForm.value.date && this.dateTimeTypeForm.value.timeFrom && this.dateTimeTypeForm.value.timeTo) {
      var date = formatDate(this.dateTimeTypeForm.value.date, "yyyy-MM-dd", 'en-US');
      var startDateTime = date + " " + this.dateTimeTypeForm.value.timeFrom;
      var endDateTime = date + " " + this.dateTimeTypeForm.value.timeTo;
      this.roomService.getAvailableExaminationRooms(startDateTime, endDateTime).subscribe((data: Room[]) => {
        this.rooms = data;
      })
    } else {
      this.rooms = [];
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
    this.getRooms();
  }

  create() {
    if (this.addPredefinedExaminationForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Create predefined examination');
      return;
    }
    if (this.dateTimeTypeForm.value.timeFrom >= this.dateTimeTypeForm.value.timeTo) {
      this.toastr.error("Starting time must be before ending time.", 'Create predefined examination');
      return;
    }

    var date = formatDate(this.dateTimeTypeForm.value.date, "yyyy-MM-dd", 'en-US')
    var startDateTime = date + " " + this.dateTimeTypeForm.value.timeFrom;
    var endDateTime = date + " " + this.dateTimeTypeForm.value.timeTo;

    const predefinedExamination = new PredefinedExamination(startDateTime, endDateTime, this.dateTimeTypeForm.value.examinationType,
      this.addPredefinedExaminationForm.value.doctor, this.addPredefinedExaminationForm.value.room.id, this.addPredefinedExaminationForm.value.discount);

    this.examinationService.createPredefinedExamination(predefinedExamination).subscribe(
      responseData => {
        this.addPredefinedExaminationForm.reset();
        this.dateTimeTypeForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully created a new predefined examination.", 'Create predefined examination');
        this.examinationService.successCreatedPredefinedExamination.next(predefinedExamination);
      },
      message => {
        this.toastr.error("Error during creation of predefined examination.", 'Create predefined examination');
      }
    );
  }

}
