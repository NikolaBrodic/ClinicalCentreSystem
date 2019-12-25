import { ExaminationReport } from './../../../models/examinationReport';
import { ExaminationReportForTable } from './../../../models/examinationReportForTable';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExaminationReportService } from './../../../services/examination-report.service';
import { DiagnoseService } from './../../../services/diagnose.service';
import { Diagnose } from './../../../models/diagnose';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-edit-examination-report',
  templateUrl: './edit-examination-report.component.html',
  styleUrls: ['./edit-examination-report.component.css']
})
export class EditExaminationReportComponent implements OnInit {
  editExaminationReportForm: FormGroup;
  diagnosis: Diagnose[] = [];
  preselectedDiagnose: Diagnose;
  examinationId: number;

  constructor(
    private toastr: ToastrService,
    private examinationReportService: ExaminationReportService,
    private examinationService: ExaminationService,
    private diagnoseService: DiagnoseService, public dialogRef: MatDialogRef<EditExaminationReportComponent>,
    @Inject(MAT_DIALOG_DATA) public choosenExaminationReport: ExaminationReportForTable
  ) { }


  ngOnInit() {
    this.examinationId = this.examinationService.startingExamination;
    if (!this.examinationId) {
      this.dialogRef.close();
      return;
    }

    this.editExaminationReportForm = new FormGroup({
      comment: new FormControl(null, [Validators.required]),
      diagnosisList: new FormControl(null, [Validators.required])
    });

    this.editExaminationReportForm.patchValue(
      {
        'comment': this.choosenExaminationReport.comment,
      }
    );
    this.getDiagnosis();
  }

  edit() {
    if (this.editExaminationReportForm.invalid) {
      this.toastr.error("Please enter a valid data.", 'Edit examination report');
      return;
    }

    const examinationReport = new ExaminationReport(this.editExaminationReportForm.value.comment, this.editExaminationReportForm.value.diagnosisList);
    examinationReport.id = this.choosenExaminationReport.id;

    this.examinationReportService.edit(this.examinationId, examinationReport).subscribe(
      () => {
        this.toastr.success("Successfully edited the examination report.", 'Edit examination report');
        this.editExaminationReportForm.reset();
        this.dialogRef.close();
        this.examinationReportService.editSuccessEmitter.next(examinationReport);
      },
      message => {
        if (message.status == 400) {
          this.toastr.error("Examination report was made by another doctor, so you are not allowed to change it.", 'Edit examination report');
        } else {
          this.toastr.error("Examination report couldn't be edited. Please check entered data.", 'Edit examination report');
        }
      }
    );

  }

  getDiagnosis() {
    this.diagnoseService.getAllDiagnosis().subscribe((data: Diagnose[]) => {
      this.diagnosis = data;
      this.selectDiagnose();
    })
  }

  selectDiagnose() {
    this.diagnosis.forEach((element: Diagnose) => {
      if (element.id == this.choosenExaminationReport.diagnose.id) {
        this.editExaminationReportForm.controls['diagnosisList'].setValue(element);
      }
    });
  }

}
