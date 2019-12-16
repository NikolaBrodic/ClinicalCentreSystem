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
    clinic: Clinic;
    constructor(email: String, firstName: String, lastName: String, phoneNumber: String, workHoursFrom: Time, workHoursTo: Time,
        specialized: ExaminationType, id?: number, clinic?: Clinic) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.workHoursFrom = workHoursFrom;
        this.workHoursTo = workHoursTo;
        this.specialized = specialized;
        this.id = id;
        this.clinic = clinic;
    }
}