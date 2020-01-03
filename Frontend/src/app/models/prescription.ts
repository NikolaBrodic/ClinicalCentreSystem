export class Prescription {
    id: number;
    medicine: string;
    doctor: string;
    patient: string;

    constructor(id: number, medicine: string, doctor: string, patient: string) {
        this.id = id;
        this.medicine = medicine;
        this.doctor = doctor;
        this.id = id;
        this.patient = patient;
    }
}