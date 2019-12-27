import { DoctorAddExaminationOrOperationComponent } from './../doctor-add-examination-or-operation/doctor-add-examination-or-operation.component';
import { MedicalRecord } from './../../models/medicalRecord';
import { MedicalRecordService } from './../../services/medical-record.service';
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
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Examination } from 'src/app/models/examination';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  patientFullName: string;

  createExaminationReportForm: FormGroup;
  diagnosis: Diagnose[] = [];
  medicines: Medicine[] = [];
  selectedExamination: Examination;

  medicalRecordForm: FormGroup;
  medicalRecord: MedicalRecord = new MedicalRecord(-1, 0, 0, "", "");

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private location: Location,
    private examinationReportService: ExaminationReportService,
    private diagnoseService: DiagnoseService,
    private medicineService: MedicineService,
    private medicalRecordService: MedicalRecordService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.selectedExamination = JSON.parse(localStorage.getItem('startingExamination'));
    if (!this.selectedExamination) {
      this.location.back();
      return;
    }

    this.patientFullName = this.selectedExamination.patient.firstName + ' ' + this.selectedExamination.patient.lastName;

    this.createExaminationReportForm = new FormGroup({
      comment: new FormControl(null, [Validators.required]),
      diagnosisList: new FormControl(null, [Validators.required]),
      medicinesList: new FormControl(),
    });

    this.medicalRecordForm = new FormGroup({
      height: new FormControl(),
      weight: new FormControl(),
      bloodType: new FormControl(null, [Validators.maxLength(3)]),
      allergies: new FormControl(),
    })

    this.medicalRecordService.get(this.selectedExamination.patient.id).subscribe(
      (responseData: MedicalRecord) => {
        this.medicalRecord = responseData;
        this.medicalRecordForm.patchValue(
          {
            'height': this.medicalRecord.height,
            'weight': this.medicalRecord.weight,
            'bloodType': this.medicalRecord.bloodType,
            'allergies': this.medicalRecord.allergies,
          }
        )
      },
      () => {
        this.location.back();
        return;
      }
    );

    this.getDiagnosis();
    this.getMedicines();
  }

  finishExamination() {
    this.createExaminationReport();
  }

  createExaminationReport() {
    if (!this.selectedExamination) {
      this.location.back();
      return;
    }

    if (this.createExaminationReportForm.invalid) {
      this.toastr.error("Please enter valid data.", "Create examination report");
      return;
    }

    let selectedMedecines = this.createExaminationReportForm.value.medicinesList;
    let examinationReport: ExaminationReport;
    if (selectedMedecines) {
      examinationReport = new ExaminationReport(
        this.createExaminationReportForm.value.comment,
        this.createExaminationReportForm.value.diagnosisList,
        selectedMedecines
      );
    } else {
      examinationReport = new ExaminationReport(
        this.createExaminationReportForm.value.comment,
        this.createExaminationReportForm.value.diagnosisList
      );
    }

    this.examinationReportService.create(this.selectedExamination.id, examinationReport).subscribe(
      responseData => {
        this.toastr.success("Successfully created an examination report.", 'Create examination report');
        this.router.navigate(['/medical-staff/work-calendar']);
        this.examinationReportService.createSuccessEmitter.next(examinationReport);
      },
      message => {
        if (message.status == 406) {
          this.toastr.error("Examination report for this examination is already made.", 'Create examination report');
        } else {
          this.toastr.error("Examination report couldn't be made. Please check entered data.", 'Create examination report');
        }
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

  createExamination() {
    this.dialog.open(DoctorAddExaminationOrOperationComponent);
  }
  saveChanges() {
    if (!this.selectedExamination) {
      this.location.back();
      return;
    }

    if (this.medicalRecordForm.invalid) {
      this.toastr.error("Please enter valid data.", "Edit medical record");
      return;
    }

    const editedMedicalRecord = new MedicalRecord(
      this.medicalRecord.id,
      this.medicalRecordForm.value.height,
      this.medicalRecordForm.value.weight,
      this.medicalRecordForm.value.bloodType,
      this.medicalRecordForm.value.allergies,
    );

    this.medicalRecordService.edit(this.selectedExamination.id, editedMedicalRecord).subscribe(
      responseData => {
        this.toastr.success("Successfully edited patient's medical record information.", 'Edit medical record');
        this.medicalRecordService.editSuccessEmitter.next(editedMedicalRecord);
      },
      message => {
        this.toastr.error("Medical information couldn't be changed. Please check entered data.", 'Edit medical record');
      }
    );
  }

}
