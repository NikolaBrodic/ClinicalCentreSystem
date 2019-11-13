import { User } from './../../models/user';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      repeatedPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
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
    const user = new User(this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword);

    this.userService.changePassword(user).subscribe(
      responseData => {
        this.changePasswordForm.reset();
        this.toastr.success("Successfully changed password.", 'Change password');
        //TODO: redirect user 
      },
      message => {
        this.toastr.error("Old password is invalid.Please try again.", 'Change password');
      }
    );
  }


}
