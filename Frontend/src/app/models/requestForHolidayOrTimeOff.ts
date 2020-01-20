
import { DateTimeInterval } from './dateTimeInterval';

export class RequestsForHolidayOrTimeOff {
    id: number;
    type: string;
    interval: DateTimeInterval;
    firstName: string;
    lastName: string;
    status: string;

    constructor(id: number, type: string, interval: DateTimeInterval, firstName: string, lastName: string, status: string) {
        this.id = id;
        this.type = type;
        this.interval = interval;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status;
    }
}