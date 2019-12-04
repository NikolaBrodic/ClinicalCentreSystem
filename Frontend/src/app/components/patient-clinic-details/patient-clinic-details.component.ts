import { ExaminationType } from 'src/app/models/examinationType';
import { Router, ActivatedRoute } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';
import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-clinic-details',
  templateUrl: './patient-clinic-details.component.html',
  styleUrls: ['./patient-clinic-details.component.css']
})
export class PatientClinicDetailsComponent implements OnInit, OnChanges {

  public clinic: Clinic;
  public clinicExists: boolean;
  public examinationTypes: ExaminationType[] = [
    new ExaminationType('Operation', 1000),
    new ExaminationType('Examination', 500),
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        let clinicId = params['id'];
        this.fetchClinicDetails(clinicId);
      }
    );
  }

  ngOnChanges() {
  }

  fetchClinicDetails(clinicId) {
    this.clinicService.getClinicById(clinicId).subscribe(
      (data) => {
        if (data == null) {
          this.clinicExists = false;
          return;
        } else {
          this.clinicExists = true;
        }

        this.clinic = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
