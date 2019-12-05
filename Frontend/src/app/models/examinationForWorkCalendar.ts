import { Room } from './room';
import { DateTimeInterval } from './dateTimeInterval';
import { Patient } from './patient';


export class ExaminationForWorkCalendar {
    id: number;
    kind: String;
    interval: DateTimeInterval;
    room: Room;
    patient: Patient;

    constructor(id: number, kind: String, interval: DateTimeInterval, room: Room, patient: Patient) {
        this.id = id;
        this.kind = kind;
        this.interval = interval;
        this.room = room;
        this.patient = patient;
    }
}