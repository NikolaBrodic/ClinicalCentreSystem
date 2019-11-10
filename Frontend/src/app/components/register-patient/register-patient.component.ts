import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit{

  private registerForm: FormGroup;
  private submitted = false;

  constructor(
    private formBuilder: FormBuilder
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
  }

  // private matcher = new MyErrorStateMatcher();
  // private emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // private passwordFormControl = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]);
  // private repeatPasswordFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
  // ]);
  //
  // private password: string;
  // private repeatPassword: string;
  //
  //
  // constructor(private breakpointObserver: BreakpointObserver) {}
  //
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );
  //
  // private getEmailFeedback() {
  //   return this.emailFormControl.hasError('required')
  //     ? 'You must enter an email.'
  //     : this.emailFormControl.hasError('email')
  //       ? 'Not a valid email.'
  //       : '';
  // }
  //
  // private getPasswordFeedback() {
  //   console.log(this.password + ' , ' + this.repeatPassword);
  //   return this.passwordFormControl.hasError('required')
  //     ? 'You must enter a password.'
  //     : !this.passwordFormControl.hasError('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
  //       ? 'Password must be a combination of at least 8 characters, 1 uppercase, 1 lowercase letter and 1 number.'
  //       : '';
  // }
  //
  // private getRepeatPasswordFeedback() {
  //   return 'Passwords do not match.';
  // }
  //
  // private checkPasswords(group: FormGroup) {
  //   const pass = group.get('password').value;
  //   const confirmPassword = group.get('confirmPassword').value;
  //
  //   return pass === confirmPassword ? null : { notSame: true };
  // }

}

export class Patient {

  private _id: bigint;
  private _email: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private _phoneNumber: string;
  private _address: string;
  private _city: string;
  private _country: string;
  private _healthInsuranceID: string;

  constructor(id: bigint, email: string, password: string, firstName: string, lastName: string, phoneNumber: string, address: string, city: string, country: string, healthInsuranceID: string) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._firstName = firstName;
    this._lastName = lastName;
    this._phoneNumber = phoneNumber;
    this._address = address;
    this._city = city;
    this._country = country;
    this._healthInsuranceID = healthInsuranceID;
  }

  get id(): bigint {
    return this._id;
  }

  set id(value: bigint) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get healthInsuranceID(): string {
    return this._healthInsuranceID;
  }

  set healthInsuranceID(value: string) {
    this._healthInsuranceID = value;
  }

}
