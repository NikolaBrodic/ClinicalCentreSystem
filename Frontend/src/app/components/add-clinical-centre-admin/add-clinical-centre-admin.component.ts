import { ClinicalCentreAdminService } from './../../services/clinical-centre-admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Clinic } from 'src/app/models/clinic';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ClinicalCentreAdmin } from 'src/app/models/clinicalCentreAdmin';

@Component({
  selector: 'app-add-clinical-centre-admin',
  templateUrl: './add-clinical-centre-admin.component.html',
  styleUrls: ['./add-clinical-centre-admin.component.css']
})
export class AddClinicalCentreAdminComponent implements OnInit {
  addClinicalCentreAdminForm: FormGroup;
  clinics: Clinic[] = [];

  constructor(
    private toastr: ToastrService,
    private clinicalCentreAdminService: ClinicalCentreAdminService,
    public dialogRef: MatDialogRef<AddClinicalCentreAdminComponent>
  ) { }

  ngOnInit() {
    this.addClinicalCentreAdminForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
    });
  }

  add() {
    if (this.addClinicalCentreAdminForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Add clinical centre administrator');
      return;
    }

    const clinicalCentreAdmin = new ClinicalCentreAdmin(
      this.addClinicalCentreAdminForm.value.email,
      this.addClinicalCentreAdminForm.value.firstName,
      this.addClinicalCentreAdminForm.value.lastName,
      this.addClinicalCentreAdminForm.value.phoneNumber
    );

    this.clinicalCentreAdminService.add(clinicalCentreAdmin).subscribe(
      () => {
        this.addClinicalCentreAdminForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully created a new clinical centre administrator.", "Add clinical centre administrator");
        this.clinicalCentreAdminService.addSuccessEmitter.next(clinicalCentreAdmin);
      },
      () => {
        this.toastr.error("Clinical centre administrator with the same email address or phone number already exists.", 'Add clinical centre administrator');
      }
    )
  }

}
