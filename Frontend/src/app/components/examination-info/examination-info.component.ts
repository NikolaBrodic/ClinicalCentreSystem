import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditRoomComponent } from '../edit/edit-room/edit-room.component';
import { ExaminationForWorkCalendar } from 'src/app/models/examinationForWorkCalendar';
import { ExaminationService } from 'src/app/services/examination.service';
import { Examination } from 'src/app/models/examination';

@Component({
  selector: 'app-examination-info',
  templateUrl: './examination-info.component.html',
  styleUrls: ['./examination-info.component.css']
})
export class ExaminationInfoComponent implements OnInit {
  startingExaminationExists = false;

  constructor(private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditRoomComponent>, private examinationService: ExaminationService,
    @Inject(MAT_DIALOG_DATA) public examination: ExaminationForWorkCalendar) { }

  ngOnInit() {
    if (!this.examination) {
      this.dialogRef.close();
    }
    this.examinationService.getPatientStartingExamination(this.examination.patient.id).subscribe(
      (responseExamination: Examination) => {
        if (responseExamination) {
          if (JSON.parse(localStorage.getItem('startingExamination'))) {
            localStorage.removeItem('startingExamination');
          }
          localStorage.setItem('startingExamination', JSON.stringify(responseExamination));
          this.startingExaminationExists = true;
        }
      },
      () => {
        if (JSON.parse(localStorage.getItem('startingExamination'))) {
          localStorage.removeItem('startingExamination');
        }
        this.startingExaminationExists = false;
      }
    );
  }

}
