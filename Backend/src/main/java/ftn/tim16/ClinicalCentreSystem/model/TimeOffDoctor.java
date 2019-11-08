package ftn.tim16.ClinicalCentreSystem.model;

import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;
import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffType;

import javax.persistence.*;

@Entity
public class TimeOffDoctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TimeOffType type;

    @ManyToOne(fetch = FetchType.EAGER)
    private DateTimeInterval interval;

    @Enumerated(EnumType.STRING)
    private TimeOffStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    private Doctor doctor;

    public Long getId() {
        return id;
    }

    public TimeOffType getType() {
        return type;
    }

    public void setType(TimeOffType type) {
        this.type = type;
    }

    public DateTimeInterval getInterval() {
        return interval;
    }

    public void setInterval(DateTimeInterval interval) {
        this.interval = interval;
    }

    public TimeOffStatus getStatus() {
        return status;
    }

    public void setStatus(TimeOffStatus status) {
        this.status = status;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
}
