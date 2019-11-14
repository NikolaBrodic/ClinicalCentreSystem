import {Component, OnInit, Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material';
import { MustMatch } from 'src/app/validators/must-match.validator';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

export class Patient {

  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public address: string,
    public city: string,
    public country: string,
    public healthInsuranceID: string,
    public status: PatientStatus
  ) {
  }

}

export enum PatientStatus {
  AWAITING_APPROVAL,
  APPROVED
}

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  private registerForm: FormGroup;
  private submitted = false;
  private patient: Patient;

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

  private onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    // alert(this.f.email.value);

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