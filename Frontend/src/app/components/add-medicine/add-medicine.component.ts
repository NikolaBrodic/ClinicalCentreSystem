import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MedicineService } from 'src/app/services/medicine.service';
import { Medicine } from 'src/app/models/medicine';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {
  addMedicineForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private medicineService: MedicineService,
    private dialogRef: MatDialogRef<AddMedicineComponent>
  ) { }

  ngOnInit() {
    this.addMedicineForm = new FormGroup({
      label: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      chemicalComposition: new FormControl(null, [Validators.required]),
      usage: new FormControl(null, [Validators.required]),
    });
  }

  add() {
    if (this.addMedicineForm.invalid) {
      this.toastr.error("Please enter a valid data.", "Add medicine");
      return;
    }

    const medicine = new Medicine(this.addMedicineForm.value.label, this.addMedicineForm.value.chemicalComposition, this.addMedicineForm.value.usage);

    this.medicineService.add(medicine).subscribe(
      responseData => {
        this.addMedicineForm.reset();
        this.dialogRef.close();
        this.toastr.success("Successfully added a new medicine.", "Add medicine");
        this.medicineService.addSuccessEmitter.next(medicine);
      },
      errorMessage => {
        this.toastr.error("Medicine with the same label already exists.", "Add medicine");
      }
    );
  }
}
