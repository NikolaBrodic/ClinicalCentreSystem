import { Component, OnInit, Inject } from '@angular/core';
import { ExaminationType } from './../../../models/examinationType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExaminationTypeService } from '../../../services/examination-type.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-price-list',
  templateUrl: './edit-price-list.component.html',
  styleUrls: ['./edit-price-list.component.css']
})
export class EditPriceListComponent implements OnInit {
  ediExaminationTypeForm: FormGroup;

  constructor(private toastr: ToastrService, private examinationTypeService: ExaminationTypeService,
    public dialogRef: MatDialogRef<EditPriceListComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedExaminationType: ExaminationType) { }

  ngOnInit() {
    this.ediExaminationTypeForm = new FormGroup({
      price: new FormControl(null, [Validators.required, Validators.min(1)])
    });
    this.ediExaminationTypeForm.patchValue(
      {
        'price': this.selectedExaminationType.price
      }
    );
  }

  edit() {
    if (this.ediExaminationTypeForm.invalid) {
      this.toastr.error('Please enter a valid data.', 'Edit price of list');
      return;
    }

    if (!this.selectedExaminationType) {
      this.toastr.error('Please choose a examination type.', 'Edit price of list');
      this.dialogRef.close();
      return;
    }
    const examinationType = new ExaminationType(this.selectedExaminationType.label, this.ediExaminationTypeForm.value.price, this.selectedExaminationType.id);

    this.examinationTypeService.editPriceList(examinationType).subscribe(
      (responseData: ExaminationType) => {
        this.ediExaminationTypeForm.reset();
        this.dialogRef.close();
        this.toastr.success('Successfully changed price of examination type.', 'Edit price of list');
        this.examinationTypeService.updatePriceSuccessEmitter.next(responseData);
      },
      () => {
        this.toastr.error('You can not edit price of this examination type because this examination type is type of some examination.');
        this.dialogRef.close();
      }
    );
  }

}
