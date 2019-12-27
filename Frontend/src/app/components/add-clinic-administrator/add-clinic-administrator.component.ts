import { ClinicAdministrator } from 'src/app/models/clinicAdministrator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Clinic } from 'src/app/models/clinic';
import { MatDialogRef } from '@angular/material';
import { ClinicService } from 'src/app/services/clinic.service';
import { ToastrService } from 'ngx-toastr';
import { ClinicAdministratorService } from 'src/app/services/clinic-administrator.service';

@Component({
  selector: 'app-add-clinic-administrator',
  templateUrl: './add-clinic-administrator.component.html',
  styleUrls: ['./add-clinic-administrator.component.css']
})
export class AddClinicAdministratorComponent implements OnInit {

  addClinicAdminForm: FormGroup;
  clinics: Clinic[] = [];

  constructor(
    private toastr: ToastrService,
    private clinicAdministratorService: ClinicAdministratorService,
    private clinicService: ClinicService,
    public dialogRef: MatDialogRef<AddClinicAdministratorComponent>
  ) { }

  ngOnInit() {
    this.getClinics();

    this.addClinicAdminForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
      clinic: new FormControl(null, [Validators.required]),
    });
  }

  getClinics() {
    this.clinicService.getAllClinics().subscribe(
      (data) => {
        this.clinics = data;
      }
    )
  }

  add() {
    if (this.addClinicAdminForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Add clinic administrator');
      return;
    }

    const clinicAdmin = new ClinicAdministrator(
      this.addClinicAdminForm.value.email,
      this.addClinicAdminForm.value.firstName,
      this.addClinicAdminForm.value.lastName,
      this.addClinicAdminForm.value.phoneNumber,
      this.addClinicAdminForm.value.clinic
    );

    this.clinicAdministratorService.add(clinicAdmin).subscribe(
      () => {
        this.addClinicAdminForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully created a new clinic administrator.", "Add clinic administrator");
        this.clinicAdministratorService.addSuccessEmitter.next(clinicAdmin);
      },
      () => {
        this.toastr.error("Clinic administrator with the same email address or phone number already exists.", 'Add clinic administrator');
      }
    )
  }

}
