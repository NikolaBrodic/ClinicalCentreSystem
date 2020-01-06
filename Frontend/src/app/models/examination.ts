import { PatientWithId } from './patientWithId';

import { Nurse } from './nurse';
import { Room } from './room';
import { Doctor } from './doctor';
import { ExaminationType } from 'src/app/models/examinationType';
import { DateTimeInterval } from './dateTimeInterval';


export class Examination {
    id: number;
    kind: string;
    interval: DateTimeInterval;
    status: string;
    examinationType: ExaminationType;
    doctors: Doctor[];
    room: Room;
    discount: number;
    nurse: Nurse;
    patient: PatientWithId;
    constructor(id: number, kind: string, interval: DateTimeInterval, status: string, examinationType: ExaminationType, doctors: Doctor[],
        room: Room, discount: number, nurse: Nurse, patient: PatientWithId) {
        this.id = id;
        this.kind = kind;
        this.interval = interval;
        this.status = status;
        this.examinationType = examinationType;
        this.doctors = doctors;
        this.room = room;
        this.discount = discount;
        this.nurse = nurse;
        this.patient = patient;
    }
}