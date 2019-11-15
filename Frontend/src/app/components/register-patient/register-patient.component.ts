import { PatientStatus } from './../../models/patientStatus';
import { Patient } from './../../models/patient';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      repeatPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      healthInsuranceID: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    }, {
      validator: MustMatch('password', 'repeatPassword')
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
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
      data => {
        this.router.navigate(['/patient/pending-approval']);
      }
    );
  }

}
