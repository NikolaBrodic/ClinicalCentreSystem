export class Diagnose {
    id: number;
    title: string;
    description: string;

    constructor(title: string, description: string, id?: number) {
        this.title = title;
        this.description = description;
        this.id = id;
    }
}