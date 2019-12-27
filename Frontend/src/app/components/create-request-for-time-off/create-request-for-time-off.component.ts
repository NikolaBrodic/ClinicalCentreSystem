import { TimeOffDoctorService } from './../../services/time-off-doctor.service';
import { TimeOffNurseService } from './../../services/time-off-nurse.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateTimeOffRequest } from 'src/app/models/createTimeOffRequest';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-request-for-time-off',
  templateUrl: './create-request-for-time-off.component.html',
  styleUrls: ['./create-request-for-time-off.component.css']
})
export class CreateRequestForTimeOffComponent implements OnInit {
  createRequestForTimeOffForm: FormGroup;
  minDate = new Date();
  dateTimeError = false;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private timeOffDoctorService: TimeOffDoctorService,
    private timeOffNurseService: TimeOffNurseService,
  ) { }

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.createRequestForTimeOffForm = new FormGroup({
      requestType: new FormControl(null, [Validators.required]),
      dateFrom: new FormControl(null, [Validators.required]),
      timeFrom: new FormControl(null, [Validators.required]),
      dateUntil: new FormControl(null, [Validators.required]),
      timeUntil: new FormControl(null, [Validators.required])
    });
  }

  sendRequest(): void {
    this.checkDates();

    if (this.createRequestForTimeOffForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Create request for holiday/time off');
      return;
    }

    const requestType: string = this.createRequestForTimeOffForm.value.requestType;

    const startDate = formatDate(this.createRequestForTimeOffForm.value.dateFrom, "yyyy-MM-dd", 'en-US');
    const startDateTime = startDate + " " + this.createRequestForTimeOffForm.value.timeFrom;
    const endDate = formatDate(this.createRequestForTimeOffForm.value.dateUntil, "yyyy-MM-dd", 'en-US');
    const endDateTime = endDate + " " + this.createRequestForTimeOffForm.value.timeUntil;

    const requestForTimeOff = new CreateTimeOffRequest(requestType, startDateTime, endDateTime);
    if (this.userService.isDoctor()) {
      this.timeOffDoctorService.create(requestForTimeOff).subscribe(
        () => {
          this.toastr.success("Successfully created request for " + requestType.toLowerCase() + ".", 'Create request for holiday/time off');
        },
        () => {
          this.toastr.error("You have scheduled examinations/operations during specified period of time.", 'Create request for holiday/time off');
        }
      );
    } else if (this.userService.isNurse()) {
      this.timeOffNurseService.create(requestForTimeOff).subscribe(
        () => {
          this.toastr.success("Successfully created request for " + requestType.toLowerCase() + ".", 'Create request for holiday/time off');
        },
        () => {
          this.toastr.error("You have scheduled examinations during specified period of time.", 'Create request for holiday/time off');
        }
      );
    }
  }

  checkDates(): void {
    if (!(this.createRequestForTimeOffForm.value.dateFrom || this.createRequestForTimeOffForm.value.dateUntil)) {
      this.dateTimeError = true;
      return;
    }

    if (this.createRequestForTimeOffForm.value.dateFrom > this.createRequestForTimeOffForm.value.dateUntil) {
      this.dateTimeError = true;
      return;
    }

    if (this.createRequestForTimeOffForm.value.dateFrom.valueOf() == this.createRequestForTimeOffForm.value.dateUntil.valueOf()) {
      if (this.createRequestForTimeOffForm.value.timeFrom >= this.createRequestForTimeOffForm.value.timeUntil) {
        this.dateTimeError = true;
        return;
      }
    }

    this.dateTimeError = false;
  }

}
