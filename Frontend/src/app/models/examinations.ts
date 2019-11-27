import { Examination } from './examination';
export class ExaminationPagingDTO {
    examinationList: Examination[];
    numberOfItems: number;
    constructor(examinationList: Examination[], numberOfItems: number) {
        this.examinationList = examinationList;
        this.numberOfItems = numberOfItems;
    }
}