import { Diagnose } from './diagnose';
import { Medicine } from './medicine';

export class ExaminationReport {
    comment: string;
    diagnose: Diagnose;
    medicines: Medicine[];

    constructor(comment: string, diagnose: Diagnose, medicines?: Medicine[]) {
        this.comment = comment;
        this.diagnose = diagnose;
        this.medicines = medicines;
    }
}