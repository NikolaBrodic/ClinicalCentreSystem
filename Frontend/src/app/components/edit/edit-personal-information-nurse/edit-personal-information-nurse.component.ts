import { NurseService } from './../../../services/nurse.service';
import { UserService } from './../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Nurse } from './../../../models/nurse';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-personal-information-nurse',
  templateUrl: './edit-personal-information-nurse.component.html',
  styleUrls: ['./edit-personal-information-nurse.component.css']
})
export class EditPersonalInformationNurseComponent implements OnInit {
  editPersonalInformation: FormGroup;
  loggedInNurse: Nurse = new Nurse("", "", "", "", null, null, -1);

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private nurseService: NurseService,
    private userService: UserService) { }

  ngOnInit() {
    this.editPersonalInformation = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      workHoursFrom: new FormControl(null, [Validators.required]),
      workHoursTo: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
    });

    this.nurseService.get(this.userService.getLoggedInUser().id).subscribe(
      (responseData: Nurse) => {
        this.loggedInNurse = responseData;

        this.editPersonalInformation.patchValue(
          {
            'firstName': this.loggedInNurse.firstName,
            'lastName': this.loggedInNurse.lastName,
            'workHoursFrom': this.loggedInNurse.workHoursFrom,
            'workHoursTo': this.loggedInNurse.workHoursTo,
            'phoneNumber': this.loggedInNurse.phoneNumber
          }
        );
      },
      message => {
        //this.userService.logout();
      }
    );

  }

  saveChanges() {
    if (this.editPersonalInformation.invalid) {
      this.toastr.error("Please enter a valid data.", 'Edit personal information');
      return;
    }
    if (this.editPersonalInformation.value.workHoursFrom >= this.editPersonalInformation.value.workHoursTo) {
      this.toastr.error("Starting work hours must be before ending work hours.", 'Edit personal information');
      return;
    }
    const nurse = new Nurse(this.loggedInNurse.email, this.editPersonalInformation.value.firstName, this.editPersonalInformation.value.lastName,
      this.editPersonalInformation.value.phoneNumber, this.editPersonalInformation.value.workHoursFrom, this.editPersonalInformation.value.workHoursTo,
      this.loggedInNurse.id);

    this.nurseService.put(nurse).subscribe(
      responseData => {
        this.toastr.success("Successfully changed your personal information.", 'Edit personal information');
      },
      message => {
        this.toastr.error("You can not change work hours because you have scheduled examinations.", 'Edit personal information');
      }
    );
  }

}
