import { NurseService } from './../../services/nurse.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { Nurse } from 'src/app/models/nurse';
import { TimeValidator } from 'src/app/validators/time.validator';

@Component({
  selector: 'app-add-nurse',
  templateUrl: './add-nurse.component.html',
  styleUrls: ['./add-nurse.component.css']
})
export class AddNurseComponent implements OnInit {

  addNurseForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private nurseService: NurseService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddNurseComponent>
  ) { }

  ngOnInit() {
    this.addNurseForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern("0[0-9]+")]),
      workHoursFrom: new FormControl(null, [Validators.required]),
      workHoursTo: new FormControl(null, [Validators.required]),
    }, {
      validator: TimeValidator('workHoursFrom', 'workHoursTo')
    });
  }


  add() {
    if (this.addNurseForm.invalid) {
      this.toastr.error("Please enter valid data.", 'Add nurse');
      return;
    }

    const nurse = new Nurse(this.addNurseForm.value.email, this.addNurseForm.value.firstName,
      this.addNurseForm.value.lastName, this.addNurseForm.value.phoneNumber, this.addNurseForm.value.workHoursFrom,
      this.addNurseForm.value.workHoursTo);

    this.nurseService.add(nurse).subscribe(
      responseData => {
        this.addNurseForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully added a new nurse.", 'Add nurse');
        this.nurseService.addSuccessEmitter.next(nurse);
      },
      message => {
        this.toastr.error("Nurse with the same email address or phone number already exists.", 'Add nurse');
      }
    );
  }

}
