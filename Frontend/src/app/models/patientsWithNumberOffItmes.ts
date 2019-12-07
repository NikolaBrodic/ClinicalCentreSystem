import { PatientWithId } from './patientWithId';

export class PatientsWithNumberOffItmes {
    patientWithIdDTOS: PatientWithId[];
    numberOfItems: number;
    constructor(patientWithIdDTOS: PatientWithId[], numberOfItems: number) {
        this.patientWithIdDTOS = patientWithIdDTOS;
        this.numberOfItems = numberOfItems;
    }
}