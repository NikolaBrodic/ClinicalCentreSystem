import { Room } from './room';
import { Doctor } from './doctor';
import { ExaminationType } from './examinationType';

export class PredefinedExamination {
    startDateTime: string;
    endDateTime: string;
    examinationTypeDTO: ExaminationType;
    doctorDTO: Doctor;
    room: number;
    discount: number;

    constructor(startDateTime: string, endDateTime: string, examinationType: ExaminationType, doctor: Doctor,
        room: number, discount: number) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.examinationTypeDTO = examinationType;
        this.doctorDTO = doctor;
        this.room = room;
        this.discount = discount;
    }
}