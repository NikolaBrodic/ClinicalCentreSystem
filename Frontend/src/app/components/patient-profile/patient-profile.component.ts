import { PatientService } from './../../services/patient.service';
import { ExaminationService } from './../../services/examination.service';
import { Examination } from './../../models/examination';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientWithId } from './../../models/patientWithId';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  selectedPatient = new PatientWithId(0, "", "", "", "", "", "", "", "");
  patientId: number;
  startingExaminationExists = false;

  constructor(
    private patientService: PatientService,
    private examinationService: ExaminationService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
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
              this.examinationService.choosenPatient = data;
            } else {
              this.toastr.error("The selected patient doesn't exist. Please choose another one.");
              this.router.navigate(['/medicalStaff/patients']);
            }

          }
        )
      }
    );

    this.examinationService.getPatientStartingExamination(this.patientId).subscribe(
      (responseExamination: Examination) => {
        if (responseExamination) {
          this.examinationService.startingExamination = responseExamination.id;
          this.startingExaminationExists = true;
        }
      },
      () => {
        this.startingExaminationExists = false;
      }
    );
  }

}
