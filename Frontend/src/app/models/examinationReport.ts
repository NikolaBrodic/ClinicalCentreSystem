import { Diagnose } from './diagnose';
import { Medicine } from './medicine';

export class ExaminationReport {
    id: number;
    comment: string;
    diagnoseId: number;
    medicineIds: number[];

    constructor(comment: string, diagnose: Diagnose, medicines?: Medicine[], id?: number) {
        this.id = id;
        this.comment = comment;
        this.diagnoseId = diagnose.id;
        if (medicines) {
            this.medicineIds = medicines.map((medicine) => medicine.id);
        }
    }
}