import { Component, OnInit } from '@angular/core';
import { PredefinedAppointmentsService } from 'src/app/services/predefined-appointments/predefined-appointments.service';

@Component({
  selector: 'app-patient-reserve-predefined-examination',
  templateUrl: './patient-reserve-predefined-examination.component.html',
  styleUrls: ['./patient-reserve-predefined-examination.component.css']
})
export class PatientReservePredefinedExaminationComponent implements OnInit {
  appointments : [];
  constructor(private predefinedAppointmentsService : PredefinedAppointmentsService) { }

  ngOnInit() {
   this.getAllPredef();
  }
  discount(discount : number) {
    if(discount === null){
      return 0;
    }else{
      return discount;
    }
  }
  reserve(id : any) {
    this.predefinedAppointmentsService.reservePredefAppointment(id).subscribe(
      (data) => {
        console.log(data);
        alert('Uspesno ste rezervisali predefinisani pregled');
        this.getAllPredef();

      },(error) => {
        console.log(error);
      }
    )
  }
  getAllPredef() {
    this.predefinedAppointmentsService.getAllAvailablePredefined().subscribe(
      (data) => {
        console.log(data);
        this.appointments = data.map(app => {
          return {
            id : app.id,
            startTime: app.startTime.replace('T',' '),
            endTime : app.endTime.replace('T',' '),
            type : app.type,
            price : app.price,
            discount : app.discount,
            clinic : app.clinic,
            room : app.room
          }
        })
      },(error) => {
        console.log(error);
      }
    )
  }

}
