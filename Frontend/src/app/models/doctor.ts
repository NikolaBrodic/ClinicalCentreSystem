import { Clinic } from './clinic';
import { ExaminationType } from './examinationType';
import { Time } from '@angular/common';

export class Doctor {
    id: number;
    email: String;
    firstName: String;
    lastName: String;
    phoneNumber: String;
    workHoursFrom: Time;
    workHoursTo: Time;
    specialized: ExaminationType;
    clinicDTO: Clinic;
    doctorRating: Number;
    constructor(email: String, firstName: String, lastName: String, phoneNumber: String, workHoursFrom: Time, workHoursTo: Time,
        specialized: ExaminationType, id?: number, clinicDTO?: Clinic, doctorRating?: Number) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.workHoursFrom = workHoursFrom;
        this.workHoursTo = workHoursTo;
        this.specialized = specialized;
        this.id = id;
        this.clinicDTO = clinicDTO;
        this.doctorRating = doctorRating;
    }
}