import { ToastrService } from 'ngx-toastr';
import { PatientWithId } from './../../models/patientWithId';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-activated-patient',
  templateUrl: './account-activated-patient.component.html',
  styleUrls: ['./account-activated-patient.component.css']
})
export class AccountActivatedPatientComponent implements OnInit {
  success = false;

  constructor(private patientService: PatientService, private route: ActivatedRoute, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const param = params.get('id');
      this.activatePatient(+param);
    });
  }

  activatePatient(id: number) {
    this.patientService.activatePatient(id).subscribe(() => {
      this.success = true;
    },
      () => {
        this.toastr.error('Your account is already activated', 'Activate account');
        this.router.navigate(['/user/login']);
      });
  }
}
