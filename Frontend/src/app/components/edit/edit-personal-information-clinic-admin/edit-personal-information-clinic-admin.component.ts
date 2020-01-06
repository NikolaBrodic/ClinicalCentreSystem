import { UserService } from './../../../services/user.service';

import { ClinicAdmin } from './../../../models/clinicAdmin';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ClinicAdministratorService } from 'src/app/services/clinic-administrator.service';

@Component({
  selector: 'app-edit-personal-information-clinic-admin',
  templateUrl: './edit-personal-information-clinic-admin.component.html',
  styleUrls: ['./edit-personal-information-clinic-admin.component.css']
})
export class EditPersonalInformationClinicAdminComponent implements OnInit {
  editPersonalInformation: FormGroup;
  loggedClinicAdmin: ClinicAdmin = new ClinicAdmin("", "", "", "", -1);
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private clinicAdministratorService: ClinicAdministratorService,
    private userService: UserService) { }

  ngOnInit() {
    this.editPersonalInformation = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
    });

    this.clinicAdministratorService.get(this.userService.getLoggedInUser().id).subscribe(
      (responseData: ClinicAdmin) => {
        this.loggedClinicAdmin = responseData;
        this.editPersonalInformation.patchValue(
          {
            'firstName': this.loggedClinicAdmin.firstName,
            'lastName': this.loggedClinicAdmin.lastName,
            'phoneNumber': this.loggedClinicAdmin.phoneNumber,
          }
        );
      },
      () => {
        this.userService.logout();
      }
    );

  }

  saveChanges() {
    if (this.editPersonalInformation.invalid) {
      this.toastr.error("Please enter a valid data.", 'Edit personal information');
      return;
    }

    const admin = new ClinicAdmin(this.loggedClinicAdmin.email, this.editPersonalInformation.value.firstName, this.editPersonalInformation.value.lastName,
      this.editPersonalInformation.value.phoneNumber, this.loggedClinicAdmin.id);

    this.clinicAdministratorService.put(admin).subscribe(
      () => {
        this.toastr.success("Successfully changed your personal information.", 'Edit personal information');
      },
      () => {
        this.toastr.error("Clinic admin with same phone number already exist.", 'Edit personal information');
      }
    );
  }

}
