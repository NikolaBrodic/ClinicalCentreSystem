import { DiagnoseService } from './../../services/diagnose.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Diagnose } from 'src/app/models/diagnose';

@Component({
  selector: 'app-add-diagnose',
  templateUrl: './add-diagnose.component.html',
  styleUrls: ['./add-diagnose.component.css']
})
export class AddDiagnoseComponent implements OnInit {
  addDiagnoseForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private diagnoseService: DiagnoseService,
    private dialogRef: MatDialogRef<AddDiagnoseComponent>
  ) { }

  ngOnInit() {
    this.addDiagnoseForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  add() {
    if (this.addDiagnoseForm.invalid) {
      this.toastr.error('Please enter a valid data.', 'Add diagnose');
      return;
    }

    const diagnose = new Diagnose(this.addDiagnoseForm.value.title, this.addDiagnoseForm.value.description);

    this.diagnoseService.add(diagnose).subscribe(
      () => {
        this.addDiagnoseForm.reset();
        this.dialogRef.close();
        this.toastr.success('Successfully added a new diagnose.', 'Add diagnose');
        this.diagnoseService.addSuccessEmitter.next(diagnose);
      },
      () => {
        this.toastr.error('Diagnose with the ame title already exists.', 'Add diagnose');
      }
    );
  }

}
