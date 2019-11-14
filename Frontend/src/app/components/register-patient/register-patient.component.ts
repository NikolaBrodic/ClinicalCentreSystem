import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material';
import { MustMatch } from 'src/app/validators/must-match.validator';
import { Router } from '@angular/router';

export class Patient {

  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public address: string,
    public city: string,
    public counry: string,
    public healthInsuranceID: string
  ) {
  }

}

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  private registerForm: FormGroup;
  private submitted = false;

  constructor(
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

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

    this.router.navigate(['/patient/pending-approval']);
  }

}