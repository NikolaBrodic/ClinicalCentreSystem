import { ToastrService } from 'ngx-toastr';
import { ExaminationTypeService } from './../../services/examination-type.service';
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
  public clinicExists: boolean = false;
  public examinationTypes: ExaminationType[] = [];
  public clinicId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private examinationTypesService: ExaminationTypeService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.clinicId = params['id'];
        this.fetchClinicDetails(this.clinicId);
      }
    );
  }

  ngOnChanges() {
  }


  fetchClinicDetails(clinicId) {
    this.clinicService.getClinicById(clinicId).subscribe(
      (data: Clinic) => {
        if (!data) {
          this.clinicExists = false;
          this.toastr.error("Clinic ID " + clinicId + " does not exist.", "Clinic not found");
          return;
        } else {
          this.clinicExists = true;
        }

        this.clinic = data;
        this.clinic.id = clinicId;

        this.examinationTypesService.getExaminationTypesForPatient(this.clinic).subscribe(
          (data: ExaminationType[]) => {
            for (let i = 0; i < data.length; i++) {
              this.examinationTypes.push(data[i]);
            }
          },
          error => {
          }
        );
      },
      (error) => {

      }
    );
  }

  navigateToSearchDoctors() {
    console.log(this.clinicId);
  }

}
