export class MedicalRecord {
    id: number;
    height: number;
    weight: number;
    bloodType: string;
    allergies: string;

    constructor(id: number, height: number, weight: number, bloodType: string, allergies: string) {
        this.id = id;
        this.height = height;
        this.weight = weight;
        this.bloodType = bloodType;
        this.allergies = allergies;
    }
}