import { Room } from './room';
import { DateTimeInterval } from './dateTimeInterval';
import { Doctor } from './doctor';

export class AssignExaminationDTO {
    id: number;
    roomId: number;
    label: string;
    kind: string;
    available: String;
    doctors: Doctor[];

    constructor(id: number, label: string, kind: string, roomId: number, available: String, doctors?: Doctor[]) {
        this.label = label;
        this.kind = kind;
        this.id = id;
        this.roomId = roomId;
        this.available = available;
        this.doctors = doctors;
    }
}