import { DateTime } from 'luxon';
import { Diagnose } from './diagnose';
import { Prescription } from './prescription';
import { Doctor } from './doctor';

export class ExaminationReportResponse {
    id: number;
    timeCreated: DateTime;
    comment: string;
    diagnose: Diagnose;
    prescriptions: Prescription[];
    doctor: Doctor;

    constructor(timeCreated: DateTime, comment: string, diagnose: Diagnose, doctor: Doctor, prescriptions?: Prescription[], id?: number) {
        this.id = id;
        this.timeCreated = timeCreated;
        this.comment = comment;
        this.diagnose = diagnose;
        this.prescriptions = prescriptions;
        this.doctor = doctor;
    }
}