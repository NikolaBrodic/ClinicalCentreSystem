import { ExaminationReportResponse } from './examinationReportResponse';
import { DateTime } from 'luxon';
import { Diagnose } from './diagnose';
import { Doctor } from './doctor';

export class ExaminationReportForTable {
    id: number;
    timeCreated: DateTime;
    comment: string;
    diagnose: Diagnose;
    medicines: string[];
    doctor: Doctor;

    constructor(examinationReport: ExaminationReportResponse) {
        this.id = examinationReport.id;
        this.timeCreated = examinationReport.timeCreated;
        this.comment = examinationReport.comment;
        this.diagnose = examinationReport.diagnose;
        if (examinationReport.prescriptions) {
            this.medicines = examinationReport.prescriptions.map((prescription) => prescription.medicine);
        }
        this.doctor = examinationReport.doctor;
    }
}