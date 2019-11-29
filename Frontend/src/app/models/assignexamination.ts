import { Room } from './room';
import { DateTimeInterval } from './dateTimeInterval';

export class AssignExaminationDTO {
    id: number;
    room: Room;

    constructor(id: number, room: Room) {
        this.id = id;
        this.room = room;
    }
}