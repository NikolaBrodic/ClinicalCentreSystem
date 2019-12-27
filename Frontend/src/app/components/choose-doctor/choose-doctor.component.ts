import { RoomService } from './../../services/room.service';
import { Doctor } from './../../models/doctor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Examination } from './../../models/examination';
import { DoctorService } from './../../services/doctor.service';
import { Room } from './../../models/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-doctor',
  templateUrl: './choose-doctor.component.html',
  styleUrls: ['./choose-doctor.component.css']
})
export class ChooseDoctorComponent implements OnInit {
  chooseDoctorsForm: FormGroup;
  choosenRoom: Room;
  choosenExamination: Examination;
  doctors: Doctor[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public receivedData, public dialogRef: MatDialogRef<ChooseDoctorComponent>
  ) { }

  ngOnInit(): void {
    this.chooseDoctorsForm = new FormGroup({
      doctorsList: new FormControl(null, [Validators.required])
    });

    this.choosenRoom = this.receivedData.choosenRoom;
    this.choosenExamination = this.receivedData.choosenExamination;
    if (!this.choosenRoom || !this.choosenExamination) {
      this.toastr.error('First you need to select room and examination.', 'Assign room');
      this.router.navigate['/clinic-admin/examination/get-awaiting'];
      return;
    }
    this.getAvailableDoctors();
  }

  assign(): void {
    if (this.chooseDoctorsForm.invalid) {
      this.toastr.error('Please choose one doctor.', 'Assign room');
      return;
    }
    const choosenDoctors = [this.chooseDoctorsForm.value.doctorsList];

    this.roomService.assignRoom(this.choosenRoom, this.choosenExamination, choosenDoctors).subscribe(
      () => {
        this.toastr.success('Successfully assigned examination room ', 'Assign room');
        this.dialogRef.close();
        this.router.navigate(['/clinic-admin/examination/get-awaiting']);
      },
      () => {
        this.toastr.error('You can not assign this room. Please choose another one.', 'Assign room');
      }
    );
  }

  getAvailableDoctors(): void {
    const duration = moment.duration(moment(this.choosenExamination.interval.endDateTime, 'YYYY-MM-DD HH:mm')
      .diff(moment(this.choosenExamination.interval.startDateTime, 'YYYY-MM-DD HH:mm'))
    )
    const endDateTime = moment(this.choosenRoom.available, 'YYYY-MM-DD HH:mm').add(duration).format('YYYY-MM-DD HH:mm');

    this.doctorService.getAllAvailableDoctors(this.choosenExamination.examinationType.id, this.choosenRoom.available.toString(), endDateTime)
      .subscribe((data: Doctor[]) => {
        this.doctors = data;
      })
  }
}
