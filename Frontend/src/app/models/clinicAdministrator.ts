import { Clinic } from './clinic';

export class ClinicAdministrator {
    id: number;
    email: String;
    firstName: String;
    lastName: String;
    phoneNumber: String;
    clinic: Clinic;

    constructor(email: String, firstName: String, lastName: String, phoneNumber: String, clinic: Clinic, id?: number) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.clinic = clinic;
        this.id = id;
    }
}