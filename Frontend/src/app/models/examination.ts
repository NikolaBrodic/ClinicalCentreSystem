import { NgxMaterialTimepickerHoursFace } from 'ngx-material-timepicker/src/app/material-timepicker/components/timepicker-hours-face/ngx-material-timepicker-hours-face';

export class Examination {
    id: number;
    clinic_rating: String;
    discount: String;
    doctor_rating: String;
    kind: String;
    status: String;
    clinic_id: String;
    clinic_administrator_id: String;
    examination_type_id: String;
    interval_id: String;
    nurse_id: String;
    patient_id: String;
    room_id: String;

    constructor(
        clinic_rating: String,
        discount: String,
        doctor_rating: String,
        kind: String,
        status: String,
        clinic_id: String,
        clinic_administrator_id: String,
        examination_type_id: String,
        interval_id: String,
        nurse_id: String,
        patient_id: String,
        room_id: String,
    ) {
        this.clinic_rating = clinic_rating;
        this.discount = discount;
        this.doctor_rating = doctor_rating;
        this.kind = kind;
        this.status = status;
        this.clinic_id = clinic_id;
        this.clinic_administrator_id = clinic_administrator_id;
        this.examination_type_id = examination_type_id;
        this.interval_id = interval_id;
        this.nurse_id = nurse_id;
        this.patient_id = patient_id;
        this.room_id = room_id;
    }
}