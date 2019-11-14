export class ExaminationType {
    id: number;
    label: String;
    price: number;
    constructor(label: String, price: number, id?: number) {
        this.label = label;
        this.price = price;
        this.id = id;
    }
}