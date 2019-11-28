import { Nurse } from './nurse';

export class NursesWithNumberOfItems {
    nurses: Nurse[];
    numberOfItems: number;

    constructor(nurses: Nurse[], numberOfItems: number) {
        this.nurses = nurses;
        this.numberOfItems = numberOfItems;
    }
}