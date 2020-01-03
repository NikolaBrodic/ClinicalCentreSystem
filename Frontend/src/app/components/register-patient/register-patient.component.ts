import { PatientStatus } from './../../models/patientStatus';
import { Patient } from './../../models/patient';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MustMatch } from 'src/app/validators/must-match.validator';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  patient: Patient;

  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      repeatPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
      healthInsuranceID: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern("[0-9]+")]),
    }, {
      validator: MustMatch('password', 'repeatPassword')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.patient = new Patient(
      this.f.email.value,
      this.f.password.value,
      this.f.firstName.value,
      this.f.lastName.value,
      this.f.phoneNumber.value,
      this.f.address.value,
      this.f.city.value,
      this.f.country.value,
      this.f.healthInsuranceID.value,
      PatientStatus.AWAITING_APPROVAL
    );

    this.createPatient();
  }

  private createPatient() {
    this.patientService.createPatient(this.patient).subscribe(
      () => {
        this.router.navigate(['/patient/pending-approval']);
      }
    );
  }

}
