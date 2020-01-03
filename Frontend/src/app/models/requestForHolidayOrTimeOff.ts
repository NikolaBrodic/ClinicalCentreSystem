
import { DateTimeInterval } from './dateTimeInterval';

export class RequestsForHolidayOrTimeOff {
    id: number;
    type: string;
    interval: DateTimeInterval;
    firstName: string;
    lastName: string;
    constructor(id: number, type: string, interval: DateTimeInterval, firstName: string, lastName: string) {
        this.id = id;
        this.type = type;
        this.interval = interval;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}