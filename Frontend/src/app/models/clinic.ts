export class Clinic {
    id: number;
    name: string;
    address: string;
    description: string;

    constructor(name: string, address: string, description: string, id?: number) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.id = id;
    }
}