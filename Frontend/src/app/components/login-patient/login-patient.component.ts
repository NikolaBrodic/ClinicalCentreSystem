import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

export class Patient {
  constructor(
    public email: string,
    public password: string
  ) { }
}

@Component({
  selector: 'app-login-patient',
  templateUrl: './login-patient.component.html',
  styleUrls: ['./login-patient.component.css']
})
export class LoginPatientComponent implements OnInit {

  private loginForm: FormGroup;
  private submitted = false;
  private patient: Patient;

  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  private onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
    this.patient = new Patient(
      this.f.email.value,
      this.f.password.value
    );

    this.attemptPatientLogin();
  }

  public attemptPatientLogin() {
    this.patientService.loginPatient(this.patient).subscribe(
      data => {
        if (data !== null) {
          console.log("successful login");
        } else {
          console.log("login failed");
        }
      },
      error => {
        console.log("request failed");
      }
    )
  }

}
