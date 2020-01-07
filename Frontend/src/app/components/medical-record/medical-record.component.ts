import { MedicalRecordService } from './../../services/medical-record.service';
import { ToastrService } from 'ngx-toastr';
import { MedicalRecord } from './../../models/medicalRecord';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  patientId: number;
  medicalRecord = new MedicalRecord(0, 0, 0, "-", "-");

  constructor(
    private route: ActivatedRoute,
    private medicalRecordService: MedicalRecordService,
    private toastr: ToastrService,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.patientId = params['id'];
        this.medicalRecordService.get(this.patientId).subscribe(
          (data: MedicalRecord) => {
            if (data) {
              this.medicalRecord = data;
            } else {
              this.toastr.error("Medical record for that patient doesn't exist.");
              this.location.back();
            }
          },
          () => {
            this.toastr.error("You are not allowed to view this patient's medical record, because he/she wasn't your patient in the past.");
            this.location.back();
          }
        )
      }
    );
  }
}
