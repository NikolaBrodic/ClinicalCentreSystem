import { Component, OnInit } from '@angular/core';
import { GradingService } from 'src/app/services/grading/grading.service';

@Component({
  selector: 'app-patient-grading',
  templateUrl: './patient-grading.component.html',
  styleUrls: ['./patient-grading.component.css']
})
export class PatientGradingComponent implements OnInit {

  helper: any;
  userId: any;
  doctors = [];
  clinics = [];
  selectedType: any;
  selectedClinic: any;

  constructor(private gradingService : GradingService) { }

  ngOnInit() {
    this.findClinics();
    this.findDoctors();
  }
  onItemChange(value){
    console.log(" Value is : ", value );
    this.selectedClinic=value;
 }
  onDoctorChange(filterVal) {
    this.selectedType = filterVal;
    console.log(this.selectedType);
  }
  
  doktori(doctorId:any,value:any) {
    console.log(value,doctorId);
    this.gradingService.makeGradeDoctor(doctorId, this.selectedType, this.userId)
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }
  
  klinike(clinicname:String,value:any) {
    console.log(this.selectedClinic,clinicname);
    this.gradingService.makeGradeClinic(clinicname, this.selectedClinic, this.userId)
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }

  findClinics() {
    console.log(this.userId);
    this.gradingService.getClinics(this.userId)
      .subscribe(
        (data) => {
          console.log(data);
          this.clinics = Object.assign([], (data));
        }
      )
  }
  findDoctors() {
    console.log(this.userId);
    this.gradingService.getDoctors(this.userId)
      .subscribe(
        (data) => {
          console.log(data);
          this.doctors = Object.assign([], (data));
        }
      )
  }

}
