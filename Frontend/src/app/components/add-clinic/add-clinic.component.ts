import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClinicService } from 'src/app/services/clinic.service';
import { MatDialogRef } from '@angular/material';
import { Clinic } from 'src/app/models/clinic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
})
export class AddClinicComponent implements OnInit {
  addClinicForm: FormGroup;
  searchAdress: Subscription;

  constructor(
    private toastr: ToastrService,
    private clinicService: ClinicService,
    private dialogRef: MatDialogRef<AddClinicComponent>
  ) { }

  ngOnInit() {
    this.addClinicForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      address: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });

    this.searchAdress = this.clinicService.addSearchAddressClinicEmitter.subscribe(
      (clinic: Clinic) => {
        this.addClinicForm.patchValue(
          {
            'address': clinic.address
          }
        );
      }
    );
  }

  addressFocusOut() {
    const clinic = new Clinic("", this.addClinicForm.value.address,
      "", -1);

    if (clinic.address) {
      this.clinicService.addClinicAdressEmiter.next(clinic);
    }
  }

  add() {
    if (this.addClinicForm.invalid) {
      this.toastr.error("Please enter a valid data.", "Add clinic");
      return;
    }

    const clinic = new Clinic(this.addClinicForm.value.name, this.addClinicForm.value.address, this.addClinicForm.value.description, this.addClinicForm.value.id);

    this.clinicService.add(clinic).subscribe(
      () => {
        this.addClinicForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully added a new clinic.", "Add clinic");
        this.clinicService.addSuccessEmitter.next(clinic);
      },
      () => {
        this.toastr.error("Clinic with the same name or address already exists.", "Add clinic");
      }
    );
  }

}
