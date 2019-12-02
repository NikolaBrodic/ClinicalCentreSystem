import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
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
  constructor(private patientService: PatientService,
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {
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
  }



}
