import { PatientWithId } from './patientWithId';
import { Patient } from './../components/login-patient/login-patient.component';
import { Doctor } from './doctor';
import { ExaminationType } from 'src/app/models/examinationType';


export class CreateExamination {
    kind: String;
    startDateTime: string;
    endDateTime: string;
    examinationType: ExaminationType;
    doctors: Doctor[];
    patient: PatientWithId;

    constructor(kind: String, startDateTime: string, endDateTime: string, examinationType: ExaminationType, patient: PatientWithId, doctors?: Doctor[]) {
        this.kind = kind;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.examinationType = examinationType;
        this.doctors = doctors;
        this.patient = patient;
    }
}