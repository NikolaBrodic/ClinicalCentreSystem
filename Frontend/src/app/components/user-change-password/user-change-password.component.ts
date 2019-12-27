import { UserLoginRequest } from './../../models/userLoginRequest';
import { MustMatch } from 'src/app/validators/must-match.validator';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private userService: UserService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userOldPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
      repeatedPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])
    }, {
      validator: MustMatch('newPassword', 'repeatedPassword')
    });

  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Change password');
      return;
    }
    if (this.changePasswordForm.value.newPassword != this.changePasswordForm.value.repeatedPassword) {
      this.toastr.error("Repeated password must be the same as a new password", 'Change password');
      return;
    }
    const user = new User(this.changePasswordForm.value.userEmail, this.changePasswordForm.value.userOldPassword, this.changePasswordForm.value.newPassword);

    this.userService.changePassword(user).subscribe(
      () => {
        this.changePasswordForm.reset();
        this.toastr.success("Successfully changed password. Please sign in with your new password.", 'Change password');
        this.userService.logout();
      },
      () => {
        this.toastr.error("Old password is invalid. Please try again.", 'Change password');
      }
    );
  }


}
