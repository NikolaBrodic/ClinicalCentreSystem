import { Component, OnInit } from '@angular/core';
import { PatientInformationService } from 'src/app/services/patient-information/patient-information.service';

@Component({
  selector: 'app-patient-view-and-change-information',
  templateUrl: './patient-view-and-change-information.component.html',
  styleUrls: ['./patient-view-and-change-information.component.css']
})
export class PatientViewAndChangeInformationComponent implements OnInit {

  email: any;
  firstName: any;
  lastName: any;
  phoneNumber: any;
  address: any;
  city: any;
  country: any;
  healthInsuranceID: any;
  disabled= true;
  constructor(private patientInformation: PatientInformationService) { }

  ngOnInit() {
    this.getPatientInformation();
  }

  getPatientInformation() {
    this.patientInformation.getPatientInformation()
      .subscribe(
        (data) => {
          console.log(data);
          this.email = data.email
          this.firstName = data.firstName
          this.lastName = data.lastName
          this.phoneNumber = data.phoneNumber
          this.address = data.address
          this.city = data.city
          this.country = data.country
          this.healthInsuranceID = data.healthInsuranceID

        }
      )
  }
  enable() {
    this.disabled = !this.disabled;
  }
  change() {
    this.patientInformation.updatePatient(this.firstName,
      this.lastName,
      this.phoneNumber,
      this.address,
      this.city,
      this.country)
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }


}
