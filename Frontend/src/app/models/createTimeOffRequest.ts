export class CreateTimeOffRequest {
    type: string;
    startDateTime: string;
    endDateTime: string;

    constructor(type: string, startDateTime: string, endDateTime: string) {
        this.type = type;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }
}