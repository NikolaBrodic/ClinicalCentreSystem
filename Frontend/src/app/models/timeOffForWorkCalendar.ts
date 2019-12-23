
import { DateTimeInterval } from './dateTimeInterval';

export class TimeOffForWorkCalendar {
    id: number;
    type: string;
    interval: DateTimeInterval;

    constructor(id: number, type: string, interval: DateTimeInterval) {
        this.id = id;
        this.type = type;
        this.interval = interval;
    }
}