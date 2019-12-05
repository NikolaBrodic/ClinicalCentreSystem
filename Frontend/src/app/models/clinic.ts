export class Clinic {
    id: number;
    name: string;
    address: string;
    description: string;
    clinicRating: number;
    price: number;

    constructor(name: string, address: string, description: string, id?: number, clinicRating?: number, price?: number) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.id = id;
        this.clinicRating = clinicRating;
        this.price = price;
    }
}