import { MedicalRecordService } from './../../services/medical-record.service';
import { ToastrService } from 'ngx-toastr';
import { MedicalRecord } from './../../models/medicalRecord';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { PatientWithId } from 'src/app/models/patientWithId';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  patientId: number;
  medicalRecord = new MedicalRecord(0, 0, 0, "-", "-");
  selectedPatient = new PatientWithId(0, "", "", "", "", "", "", "", "");

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.patientId = params['id'];
        this.medicalRecord = JSON.parse(localStorage.getItem('medicalRecord'));
        this.selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));

        if (!this.medicalRecord || this.selectedPatient.id != this.patientId) {
          this.toastr.error("You are not allowed to view this patient's medical record, because he/she wasn't your patient in the past.");
          this.location.back();
          return;
        }
      }
    );
  }
}
