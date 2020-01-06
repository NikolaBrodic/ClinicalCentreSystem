import { ExaminationTypeService } from './../../../services/examination-type.service';
import { DoctorService } from './../../../services/doctor.service';
import { Doctor } from './../../../models/doctor';
import { ClinicAdministratorService } from './../../../services/clinic-administrator.service';
import { UserService } from './../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ExaminationType } from './../../../models/examinationType';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-personal-information-doctor',
  templateUrl: './edit-personal-information-doctor.component.html',
  styleUrls: ['./edit-personal-information-doctor.component.css']
})
export class EditPersonalInformationDoctorComponent implements OnInit {
  editPersonalInformation: FormGroup;
  loggedInDoctor: Doctor = new Doctor(' ', ' ', ' ', ' ', null, null, new ExaminationType(' ', -1, -1), -1);
  specializations: ExaminationType[] = [];

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private doctorService: DoctorService,
    private userService: UserService, private examinationTypeService: ExaminationTypeService) { }

  ngOnInit() {
    this.editPersonalInformation = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      specialized: new FormControl(null, [Validators.required]),
      workHoursFrom: new FormControl(null, [Validators.required]),
      workHoursTo: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
    });

    this.doctorService.get(this.userService.getLoggedInUser().id).subscribe(
      (responseData: Doctor) => {
        this.loggedInDoctor = responseData;

        this.editPersonalInformation.patchValue(
          {
            'firstName': this.loggedInDoctor.firstName,
            'lastName': this.loggedInDoctor.lastName,
            'specialized': this.loggedInDoctor.specialized,
            'workHoursFrom': this.loggedInDoctor.workHoursFrom,
            'workHoursTo': this.loggedInDoctor.workHoursTo,
            'phoneNumber': this.loggedInDoctor.phoneNumber
          }
        );
        this.getSpecializations();
      },
      () => {
        this.userService.logout();
      }
    );

  }

  getSpecializations() {
    this.examinationTypeService.getExaminationTypesByClinicId(this.loggedInDoctor.clinicDTO.id).subscribe((data) => {
      this.specializations = data;
      this.selectSpecialization();
    })
  }

  selectSpecialization() {
    this.specializations.forEach((element: ExaminationType) => {
      if (element.id === this.loggedInDoctor.specialized.id) {
        this.editPersonalInformation.controls['specialized'].setValue(element);
      }
    });
  }
  saveChanges() {
    if (this.editPersonalInformation.invalid) {
      this.toastr.error('Please enter a valid data. ', 'Edit personal information');
      return;
    }
    if (this.editPersonalInformation.value.workHoursFrom >= this.editPersonalInformation.value.workHoursTo) {
      this.toastr.error('Starting work hours must be before ending work hours. ', 'Edit personal information');
      return;
    }
    const doctor = new Doctor(this.loggedInDoctor.email, this.editPersonalInformation.value.firstName, this.editPersonalInformation.value.lastName,
      this.editPersonalInformation.value.phoneNumber, this.editPersonalInformation.value.workHoursFrom, this.editPersonalInformation.value.workHoursTo,
      this.editPersonalInformation.value.specialized, this.loggedInDoctor.id);

    this.doctorService.put(doctor).subscribe(
      () => {
        this.toastr.success('Successfully changed your personal information. ', 'Edit personal information');
      },
      () => {
        this.toastr.error('You can not change work hours and specialization because you have scheduled examinations or someone has the same phone number. ', 'Edit personal information');
      }
    );
  }
}
