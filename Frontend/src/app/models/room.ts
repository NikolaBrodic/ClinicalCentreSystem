import { DateTime } from 'luxon';
export class Room {
    id: number;
    label: string;
    kind: string;
    available: DateTime;
    constructor(label: string, kind: string, id?: number, available?: DateTime) {
        this.label = label;
        this.kind = kind;
        this.id = id;
    }
}