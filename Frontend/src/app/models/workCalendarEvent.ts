export class WorkCalendarEvent {
    kind: string;
    startTime: Date;
    duration: number;
    patientFirstName: string;
    patientLastName: string;

    constructor(kind: string, startTime: Date, duration: number, patientFirstName: string, patientLastName: string) {
        this.kind = kind;
        this.startTime = startTime;
        this.duration = duration;
        this.patientFirstName = patientFirstName;
        this.patientLastName = patientLastName;
    }
}