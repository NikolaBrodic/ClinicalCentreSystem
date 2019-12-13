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
    doctorRating: number;
    constructor(email: String, firstName: String, lastName: String, phoneNumber: String, workHoursFrom: Time, workHoursTo: Time,
        specialized: ExaminationType, id?: number, doctorRating?: number) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.workHoursFrom = workHoursFrom;
        this.workHoursTo = workHoursTo;
        this.specialized = specialized;
        this.id = id;
        this.doctorRating = doctorRating;
    }
}