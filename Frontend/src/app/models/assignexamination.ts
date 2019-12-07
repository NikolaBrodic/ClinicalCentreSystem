import { Room } from './room';
import { DateTimeInterval } from './dateTimeInterval';

export class AssignExaminationDTO {
    id: number;
    roomId: number;
    label: string;
    kind: string;
    available: String;

    constructor(id: number, label: string, kind: string, roomId: number, available: String) {
        this.label = label;
        this.kind = kind;
        this.id = id;
        this.roomId = roomId;
        this.available = available;
    }
}