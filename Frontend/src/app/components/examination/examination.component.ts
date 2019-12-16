import { ExaminationReport } from './../../models/examinationReport';
import { ExaminationReportService } from './../../services/examination-report.service';
import { MedicineService } from './../../services/medicine.service';
import { DiagnoseService } from './../../services/diagnose.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Diagnose } from 'src/app/models/diagnose';
import { Medicine } from 'src/app/models/medicine';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  createExaminationReportForm: FormGroup;
  diagnosis: Diagnose[] = [];
  medicines: Medicine[] = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private examinationReportService: ExaminationReportService,
    private diagnoseService: DiagnoseService,
    private medicineService: MedicineService
  ) { }

  ngOnInit() {
    this.createExaminationReportForm = new FormGroup({
      comment: new FormControl(null, [Validators.required]),
      diagnosisList: new FormControl(null, [Validators.required]),
      medicinesList: new FormControl(),
    });

    this.getDiagnosis();
    this.getMedicines();
  }

  finishExamination() {
    this.createExaminationReport();
  }

  createExaminationReport() {
    if (this.createExaminationReportForm.invalid) {
      this.toastr.error("Please enter valid data.", "Create examination report");
      return;
    }

    const examinationReport = new ExaminationReport(
      this.createExaminationReportForm.value.comment,
      this.createExaminationReportForm.value.diagnosisList,
      [...this.createExaminationReportForm.value.medicinesList]
    );

    this.examinationReportService.create(examinationReport).subscribe(
      responseData => {
        this.toastr.success("Successfully created an examination report.", 'Create examination report');
        this.router.navigate(['/medical-staff/work-calendar']);
        this.examinationReportService.createSuccessEmitter.next(examinationReport);
      },
      message => {
        this.toastr.error("Examination report couldn't be made. Please check entered data.", 'Create examination report');
      }
    );
  }

  getDiagnosis() {
    this.diagnoseService.getAllDiagnosis().subscribe(data => {
      this.diagnosis = data;
    })
  }

  getMedicines() {
    this.medicineService.getAllMedicines().subscribe(data => {
      this.medicines = data;
    })
  }

}
