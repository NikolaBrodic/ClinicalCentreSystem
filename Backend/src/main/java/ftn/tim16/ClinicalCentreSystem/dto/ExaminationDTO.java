package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.model.DateTimeInterval;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.model.Room;

public class ExaminationDTO {
    private Long id;
    private String kind;
    private DateTimeInterval interval;
    private Room room;
    private Patient patient;

    public ExaminationDTO(Examination examination) {
        this.id = examination.getId();
        this.interval = examination.getInterval();
        this.room = examination.getRoom();
        this.patient = examination.getPatient();
        this.kind = examination.getKind().toString();
        if (examination.getStatus() == ExaminationStatus.PREDEF_BOOKED || examination.getStatus() == ExaminationStatus.PREDEF_AVAILABLE) {
            this.kind = "PREDEF. EXAMINATION";
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public DateTimeInterval getInterval() {
        return interval;
    }

    public void setInterval(DateTimeInterval interval) {
        this.interval = interval;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
