import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientExaminationService } from 'src/app/services/patient-examination/patient-examination.service';

@Component({
  selector: 'app-incoming-examinations',
  templateUrl: './incoming-examinations.component.html',
  styleUrls: ['./incoming-examinations.component.css']
})
export class IncomingExaminationsComponent implements OnInit {

  predefAppointments = [];
  helper: any;
  userId : any;

  constructor(private router: Router,
    private examinationService : PatientExaminationService) { }

  ngOnInit() {
    this.getIncomingAppointments();

  }
  getIncomingAppointments() {
    this.examinationService.getIncomingExaminationsPatient()
      .subscribe(
        (data) => {
          console.log(data);
          this.predefAppointments = Object.assign([], (data));
          console.log(this.predefAppointments);
        }
      )
  }
  otkazi(app : any){
    console.log(app)
    let d = new Date();
    let appYear = app.startTime[0];
    let appMonth = app.startTime[1];
    let appDay = app.startTime[2];
    let flag = 0;
    if(appYear > d.getFullYear()){
      flag = 1;
    }else if(appMonth > d.getMonth()){
      flag = 1;

    }else if(appDay >  d.getDay()){
      flag = 1;
    }
    if(flag === 1){
      this.examinationService.cancel(app.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.getIncomingAppointments();
        } 
      )
    }else {
      alert('Ne mozete otkazati ovaj termin jer je previse blizu');
    }
    

  }

}
