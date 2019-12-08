import { Room } from './room';
import { Doctor } from './doctor';
import { ExaminationType } from './examinationType';

export class PredefinedExamination {
    startDateTime: string;
    endDateTime: string;
    examinationType: ExaminationType;
    doctor: Doctor;
    room: Room;
    discount: number;

    constructor(startDateTime: string, endDateTime: string, examinationType: ExaminationType, doctor: Doctor,
        room: Room, discount: number) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.examinationType = examinationType;
        this.doctor = doctor;
        this.room = room;
        this.discount = discount;
    }
}