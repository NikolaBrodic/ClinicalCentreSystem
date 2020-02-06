import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from 'src/app/services/medical-record/medical-record.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {

  medicalRecord : any;

  firstName : string;
  lastName : string;
  height : number;
  weight : number;
  alergies : string;
  bloodType : string;
  examinations : [];
  constructor(private medicalRecordService :  MedicalRecordService) { }

  ngOnInit() {
      this.medicalRecordService.getMedicalRecordForPatient().subscribe(
        (data) => {
          console.log(data);
          this.medicalRecord = data
          this.firstName = this.medicalRecord.ime
          this.lastName = this.medicalRecord.prezime;
          this.weight = this.medicalRecord.weight;
          this.height = this.medicalRecord.height;
          this.alergies = this.medicalRecord.allergies;
          this.bloodType = this.medicalRecord.bloodType;
          this.examinations = this.medicalRecord.examinations.map(examination =>{
            return {
              comment : examination.comment,
              diagnose : examination.diagnose,
              medicines : examination.prescriptions.join()
            }
          
          })
          console.log(this.examinations)
          
        },(error) => (
          console.log(error)
        )
      )
  }

}
