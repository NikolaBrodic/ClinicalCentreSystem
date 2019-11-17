import { ExaminationTypeService } from './../../services/examination-type.service';
import { ExaminationType } from './../../models/examinationType';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-examination-type',
  templateUrl: './add-examination-type.component.html',
  styleUrls: ['./add-examination-type.component.css']
})
export class AddExaminationTypeComponent implements OnInit {
  addExaminationTypeForm: FormGroup;

  constructor(private toastr: ToastrService, private examinationTypeService: ExaminationTypeService,
    public dialogRef: MatDialogRef<AddExaminationTypeComponent>) { }

  ngOnInit() {
    this.addExaminationTypeForm = new FormGroup({
      label: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(1)])
    });

  }

  create() {
    if (this.addExaminationTypeForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Add examination type');
      return;
    }
    const examinationType = new ExaminationType(this.addExaminationTypeForm.value.label, this.addExaminationTypeForm.value.price);

    this.examinationTypeService.create(examinationType).subscribe(
      responseData => {
        this.addExaminationTypeForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully created a new examination type.", 'Add examination type');
        this.examinationTypeService.createSuccessEmitter.next(examinationType);
      },
      message => {
        this.toastr.error("Examination type with same label aready exist.", 'Add examination type');
      }
    );
  }

}
