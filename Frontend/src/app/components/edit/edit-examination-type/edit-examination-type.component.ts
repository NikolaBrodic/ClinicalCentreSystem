import { ExaminationType } from './../../../models/examinationType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExaminationTypeService } from '../../../services/examination-type.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-examination-type',
  templateUrl: './edit-examination-type.component.html',
  styleUrls: ['./edit-examination-type.component.css']
})
export class EditExaminationTypeComponent implements OnInit {
  ediExaminationTypeForm: FormGroup;

  constructor(private toastr: ToastrService, private examinationTypeService: ExaminationTypeService,
    public dialogRef: MatDialogRef<EditExaminationTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedExaminationType: ExaminationType) { }

  ngOnInit() {
    this.ediExaminationTypeForm = new FormGroup({
      label: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      price: new FormControl(null, [Validators.required, Validators.min(1)])
    });
    this.ediExaminationTypeForm.patchValue(
      {
        'label': this.selectedExaminationType.label,
        'price': this.selectedExaminationType.price
      }
    );
  }

  edit() {
    if (this.ediExaminationTypeForm.invalid) {
      this.toastr.error('Please enter a valid data. ', 'Edit examination type');
      return;
    }
    if (!this.selectedExaminationType) {
      this.toastr.error('Please choose a examination type. ', 'Edit examination type');
      this.dialogRef.close();
      return;
    }
    const examinationType = new ExaminationType(this.ediExaminationTypeForm.value.label, this.ediExaminationTypeForm.value.price, this.selectedExaminationType.id);

    this.examinationTypeService.edit(examinationType).subscribe(
      (responseData: ExaminationType) => {
        this.ediExaminationTypeForm.reset();
        this.dialogRef.close();
        this.toastr.success('Successfully changed examination type. ', 'Edit examination type');
        this.examinationTypeService.updateSuccessEmitter.next(responseData);
      },
      () => {
        this.toastr.error("You can not delete this examination type because it is in use.",
          'Edit examination typ');
        this.dialogRef.close();
      }
    );
  }

}
