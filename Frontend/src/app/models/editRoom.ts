export class EditRoom {
    id: number;
    label: string;
    kind: string;
    constructor(id: number, label: string, kind: string) {
        this.label = label;
        this.kind = kind;
        this.id = id;
    }
}