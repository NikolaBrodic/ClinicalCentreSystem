
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TimeOffNurseService } from 'src/app/services/time-off-nurse.service';
import { TimeOffDoctorService } from 'src/app/services/time-off-doctor.service';

@Component({
  selector: 'app-reject-request-for-holiday-or-time-off',
  templateUrl: './reject-request-for-holiday-or-time-off.component.html',
  styleUrls: ['./reject-request-for-holiday-or-time-off.component.css']
})
export class RejectRequestForHolidayOrTimeOffComponent implements OnInit {

  rejectRequestForm: FormGroup

  constructor(
    private toastr: ToastrService,
    private timeOffDoctorService: TimeOffDoctorService, private timeOffNurseService: TimeOffNurseService,
    public dialogRef: MatDialogRef<RejectRequestForHolidayOrTimeOffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.rejectRequestForm = new FormGroup({
      reason: new FormControl(null, Validators.required),
    });
  }

  reject() {
    if (this.rejectRequestForm.invalid) {
      this.toastr.error("Please enter an explanation for rejection.", "Reject request for holiday/time off");
      return;
    }

    const id = this.data.id;
    const reason = this.rejectRequestForm.value.reason;

    if (this.data.for === 'Doctor') {
      this.timeOffDoctorService.reject(id, reason).subscribe(
        () => {
          this.rejectRequestForm.reset();
          this.dialogRef.close();
          this.toastr.success(
            "Request for holiday/time off is rejected. Doctor will be notified",
            "Reject request for holiday/time off"
          );
          this.timeOffDoctorService.rejectSuccessEmitter.next(reason);
        },
        (message) => {
          if (message.status === 409) {
            this.toastr.error("Request for holiday/time off is already approved/rejected.", 'Reject request for holiday/time off');
          } else {
            this.toastr.error("Request for holiday/time off can't be rejected.", "Reject request for holiday/time off");
          }
          this.timeOffDoctorService.rejectSuccessEmitter.next();
          this.dialogRef.close();
        }
      )
    } else {
      this.timeOffNurseService.reject(id, reason).subscribe(
        () => {
          this.rejectRequestForm.reset();
          this.dialogRef.close();
          this.toastr.success(
            "Request for holiday/time off is rejected. Nurse will be notified",
            "Reject request for holiday/time off"
          );
          this.timeOffNurseService.rejectSuccessEmitter.next(reason);
        },
        (message) => {
          if (message.status === 409) {
            this.toastr.error("Request for holiday/time off is already approved/rejected.", 'Reject request for holiday/time off');
          } else {
            this.toastr.error("Request for holiday/time off can't be rejected.", "Reject request for holiday/time off");
          }
          this.timeOffNurseService.rejectSuccessEmitter.next();
          this.dialogRef.close();
        }
      )
    }
  }

}
