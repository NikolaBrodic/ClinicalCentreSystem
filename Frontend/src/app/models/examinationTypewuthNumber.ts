import { ExaminationType } from './examinationType';

export class ExaminationTypeWithNumber {
    examinationTypes: ExaminationType[];
    numberOfItems: number;
    constructor(examinationTypes: ExaminationType[], numberOfItems: number) {
        this.examinationTypes = examinationTypes;
        this.numberOfItems = numberOfItems;
    }
}