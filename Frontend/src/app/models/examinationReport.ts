import { Diagnose } from './diagnose';
import { Medicine } from './medicine';

export class ExaminationReport {
    comment: string;
    diagnoseId: number;
    medicineIds: number[];

    constructor(comment: string, diagnose: Diagnose, medicines?: Medicine[]) {
        this.comment = comment;
        this.diagnoseId = diagnose.id;
        this.medicineIds = medicines.map(medicine => medicine.id);
    }
}