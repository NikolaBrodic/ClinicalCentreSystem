import { ExaminationReportResponse } from './examinationReportResponse';
import { DateTime } from 'luxon';

export class ExaminationReportForTable {
    id: number;
    timeCreated: DateTime;
    comment: string;
    diagnose: string;
    medicines: string[];
    doctorId: number;

    constructor(examinationReport: ExaminationReportResponse) {
        this.id = examinationReport.id;
        this.timeCreated = examinationReport.timeCreated;
        this.comment = examinationReport.comment;
        this.diagnose = examinationReport.diagnose.title;
        if (examinationReport.prescriptions) {
            this.medicines = examinationReport.prescriptions.map(prescription => prescription.medicine);
        }
        this.doctorId = examinationReport.doctor.id;
    }
}