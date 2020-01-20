import { ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { TimeOffDoctorService } from './../../services/time-off-doctor.service';
import { TimeOffNurseService } from './../../services/time-off-nurse.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateTimeOffRequest } from 'src/app/models/createTimeOffRequest';
import { formatDate } from '@angular/common';

const DateTimeValidator: ValidatorFn = (fg: FormGroup) => {
  const dateFrom = fg.get('dateFrom').value;
  const timeFrom = fg.get('timeFrom').value;
  const dateUntil = fg.get('dateUntil').value;
  const timeUntil = fg.get('timeUntil').value;

  if (!dateFrom || !dateUntil) {
    return null;
  }

  if (dateFrom > dateUntil) {
    return { dateTimeError: true };
  }

  if (!timeFrom || !timeUntil) {
    return null;
  }

  if (dateFrom.valueOf() === dateUntil.valueOf()) {
    if (timeFrom >= timeUntil) {
      return { dateTimeError: true };
    }
  }

  return null;
};

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
    private router: Router,
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
    }, { validators: DateTimeValidator });
  }

  sendRequest(): void {
    if (!this.validDates()) {
      return;
    }

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
          this.router.navigate(['/medical-staff/work-calendar']);
        },
        () => {
          this.toastr.error("You have scheduled examinations/operations during specified period of time.", 'Create request for holiday/time off');
        }
      );
    } else if (this.userService.isNurse()) {
      this.timeOffNurseService.create(requestForTimeOff).subscribe(
        () => {
          this.toastr.success("Successfully created request for " + requestType.toLowerCase() + ".", 'Create request for holiday/time off');
          this.router.navigate(['/medical-staff/work-calendar']);
        },
        () => {
          this.toastr.error("You have scheduled examinations during specified period of time.", 'Create request for holiday/time off');
        }
      );
    }
  }

  validDates(): boolean {
    if (!(this.createRequestForTimeOffForm.value.dateFrom || this.createRequestForTimeOffForm.value.dateUntil)) {
      return false;
    }

    if (this.createRequestForTimeOffForm.value.dateFrom > this.createRequestForTimeOffForm.value.dateUntil) {
      return false;
    }

    if (this.createRequestForTimeOffForm.value.dateFrom.valueOf() === this.createRequestForTimeOffForm.value.dateUntil.valueOf()) {
      if (this.createRequestForTimeOffForm.value.timeFrom >= this.createRequestForTimeOffForm.value.timeUntil) {
        return false;
      }
    }

    return true;
  }

}
