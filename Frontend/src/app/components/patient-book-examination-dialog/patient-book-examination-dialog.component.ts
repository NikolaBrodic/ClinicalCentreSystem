import { Router } from '@angular/router';
import { Examination } from 'src/app/models/examination';
import { Clinic } from 'src/app/models/clinic';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-patient-book-examination-dialog',
  templateUrl: './patient-book-examination-dialog.component.html',
  styleUrls: ['./patient-book-examination-dialog.component.css']
})
export class PatientBookExaminationDialogComponent implements OnInit {

  public examination: Examination;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  bookExamination() {
    this.router.navigate(['/patient/examination-booked']);
  }

}
