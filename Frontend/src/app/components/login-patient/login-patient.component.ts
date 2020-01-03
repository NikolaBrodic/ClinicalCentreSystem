import { Router } from '@angular/router';
import { UserLoginRequest } from './../../models/userLoginRequest';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    this.redirectToHomePage();

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
      () => {
        this.toastr.success("You have successfuly logged in!", 'Login');
        this.redirectToHomePage();
      },
      (error) => {
        if (error.status === 406) {
          this.toastr.info("You have to change received generic password on first attempt to login.", 'Login');
          this.router.navigate(['/user/change-password']);
        } else {
          this.toastr.error("Invalid email or password. Please try again.", 'Login');
        }
      }
    )
  }

  redirectToHomePage() {
    if (this.userService.isPatient()) {
      this.router.navigate(['/patient/profile']);
    } else if (this.userService.isClinicAdmin()) {
      this.router.navigate(['/clinic-admin/examination/get-awaiting']);
    } else if (this.userService.isClinicalCentreAdmin()) {
      this.router.navigate(['/clinical-centre-admin/requests-to-register']);
    } else if (this.userService.isDoctor() || this.userService.isNurse()) {
      this.router.navigate(['/medical-staff/work-calendar']);
    } else {
      this.userService.logout();
    }
  }
}
