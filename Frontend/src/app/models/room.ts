export class Room {
    id: number;
    label: string;
    kind: string;
    constructor(label: string, kind: string, id?: number) {
        this.label = label;
        this.kind = kind;
        this.id = id;
    }
}