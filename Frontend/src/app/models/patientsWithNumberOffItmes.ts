import { Patient } from './patient';

export class PatientsWithNumberOffItmes {
    patientDTOList: Patient[];
    numberOfItems: number;
    constructor(patientDTOList: Patient[], numberOfItems: number) {
        this.patientDTOList = patientDTOList;
        this.numberOfItems = numberOfItems;
    }
}