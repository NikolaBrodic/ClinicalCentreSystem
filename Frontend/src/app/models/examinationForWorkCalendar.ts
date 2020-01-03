import { PatientWithId } from './patientWithId';
import { Room } from './room';
import { DateTimeInterval } from './dateTimeInterval';


export class ExaminationForWorkCalendar {
    id: number;
    kind: string;
    interval: DateTimeInterval;
    room: Room;
    patient: PatientWithId;

    constructor(id: number, kind: string, interval: DateTimeInterval, room: Room, patient: PatientWithId) {
        this.id = id;
        this.kind = kind;
        this.interval = interval;
        this.room = room;
        this.patient = patient;
    }
}