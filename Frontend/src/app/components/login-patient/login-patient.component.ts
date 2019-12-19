import { Router } from '@angular/router';
import { UserLoginRequest } from './../../models/userLoginRequest';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
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

  loginForm: FormGroup;
  submitted = false;
  patient: Patient;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Login');
      return;
    }

    const user = new UserLoginRequest(this.loginForm.value.email,
      this.loginForm.value.password);

    this.userService.login(user).subscribe(
      data => {
        //TODO: When you add home pages for users you need to do redirect to each one.
        this.toastr.success("You have successfuly logged in!", 'Login');
        let role = JSON.parse(localStorage.getItem('LoggedInUser'))['role'];
        if (role === 'PATIENT') {
          this.router.navigate(['/patient/examination-history']);
        }
      },
      error => {
        if (error.status == 403) {
          this.toastr.info("You have to change received generic password on first attempt to login.", 'Login');
          this.router.navigate(['/user/changePassword']);
        } else {
          this.toastr.error("Invalid email or password. Please try again.", 'Login');
        }
      }
    )
  }

}
