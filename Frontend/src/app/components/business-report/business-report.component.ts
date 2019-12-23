import { ClinicService } from 'src/app/services/clinic.service';
import { DateTime } from 'luxon';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.css']
})
export class BusinessReportComponent implements OnInit {
  startDate: DateTime;
  endDate: DateTime;
  maxDate = new Date();
  clinicRating: Number = 0.0;
  clinicRevenue: Number;
  doctorRaiting: Number;

  constructor(private toastr: ToastrService, private doctorService: DoctorService, private clinicService: ClinicService,
  ) { }

  ngOnInit() {
    this.getClinicRating();
  }

  search() {
    if (!(this.startDate || this.endDate)) {
      this.toastr.error("Please choose start and end date", 'Business report');
      return;
    }

    if (this.startDate >= this.endDate) {
      this.toastr.error("Start date must be before end date.", 'Business report');
      return;
    }
    this.clinicService.getClinicRevenue(formatDate(this.startDate.toString(), "yyyy-MM-dd", 'en-US'), formatDate(this.endDate.toString(), "yyyy-MM-dd", 'en-US')).subscribe((data: Number) => {
      this.clinicRevenue = data;
    },
      message => {
        this.toastr.error("Clinic revenue is not defined.", 'Business report');
      }
    );
  }

  getClinicRating() {
    this.clinicService.getClinicRating().subscribe((data: Number) => {
      if (data < 0 || data > 5) {
        this.clinicRating = 0.0;
      } else {
        this.clinicRating = data;
      }
      console.log(this.clinicRating);

    },
      message => {
        this.toastr.error("Clinic raiting is not defined.", 'Business report');
      }
    );
  }

}
