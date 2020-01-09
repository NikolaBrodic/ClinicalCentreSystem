import { UserService } from './../../services/user.service';
import { PatientService } from './../../services/patient.service';
import { ExaminationService } from './../../services/examination.service';
import { Examination } from './../../models/examination';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientWithId } from './../../models/patientWithId';
import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { MedicalRecord } from 'src/app/models/medicalRecord';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  selectedPatient = new PatientWithId(0, "", "", "", "", "", "", "", "");
  patientId: number;
  startingExaminationExists = false;
  medicalRecordIsAvailable = false;

  constructor(
    private patientService: PatientService,
    private examinationService: ExaminationService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private medicalRecordService: MedicalRecordService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.patientId = params['id'];
        this.patientService.getPatientForMedicalStaff(this.patientId).subscribe(
          (data: PatientWithId) => {
            if (data) {
              this.selectedPatient = data;
            } else {
              this.toastr.error("The selected patient doesn't exist. Please choose another one.");
              this.router.navigate(['/medicalStaff/patients']);
            }

          }
        )
      }
    );

    if (this.userService.isDoctor()) {
      this.getPatientStartingExamination();
    }

    this.getMedicalRecord();
  }

  getPatientStartingExamination() {
    this.examinationService.getPatientStartingExamination(this.patientId).subscribe(
      (responseExamination: Examination) => {
        if (responseExamination) {
          if (JSON.parse(localStorage.getItem('startingExamination'))) {
            localStorage.removeItem('startingExamination');
          }
          localStorage.setItem('startingExamination', JSON.stringify(responseExamination));
          this.startingExaminationExists = true;
        }
      },
      () => {
        if (JSON.parse(localStorage.getItem('startingExamination'))) {
          localStorage.removeItem('startingExamination');
        }
        this.startingExaminationExists = false;
      }
    );
  }

  getMedicalRecord() {
    this.medicalRecordService.get(this.patientId).subscribe(
      (data: MedicalRecord) => {
        if (data) {
          if (JSON.parse(localStorage.getItem('medicalRecord'))) {
            localStorage.removeItem('medicalRecord');
          }
          if (JSON.parse(localStorage.getItem('selectedPatient'))) {
            localStorage.removeItem('selectedPatient');
          }
          localStorage.setItem('medicalRecord', JSON.stringify(data));
          localStorage.setItem('selectedPatient', JSON.stringify(this.selectedPatient));
          this.medicalRecordIsAvailable = true;
        }
      },
      () => {
        if (JSON.parse(localStorage.getItem('medicalRecord'))) {
          localStorage.removeItem('medicalRecord');
        }
        if (JSON.parse(localStorage.getItem('selectedPatient'))) {
          localStorage.removeItem('selectedPatient');
        }
        this.medicalRecordIsAvailable = false;
      }
    );
  }

}
