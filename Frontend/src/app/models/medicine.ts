export class Medicine {
    id: number;
    label: string;
    chemicalComposition: string;
    usage: string;

    constructor(label: string, chemicalComposition: string, usage: string, id?: number) {
        this.label = label;
        this.chemicalComposition = chemicalComposition;
        this.usage = usage;
        this.id = id;
    }
}