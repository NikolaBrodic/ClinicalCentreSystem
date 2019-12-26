import { PatientWithId } from './patientWithId';
import { Doctor } from './doctor';
import { ExaminationType } from 'src/app/models/examinationType';


export class CreateExamination {
    kind: String;
    startDateTime: string;
    endDateTime: string;
    examinationType: ExaminationType;
    doctor: Doctor;
    patient: PatientWithId;

    constructor(kind: String, startDateTime: string, endDateTime: string, examinationType: ExaminationType, patient: PatientWithId, doctor?: Doctor) {
        this.kind = kind;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.examinationType = examinationType;
        this.doctor = doctor;
        this.patient = patient;
    }
}