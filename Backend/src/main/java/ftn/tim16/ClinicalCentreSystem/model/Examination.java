package ftn.tim16.ClinicalCentreSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class Examination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ExaminationKind kind;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private DateTimeInterval interval;

    @Enumerated(EnumType.STRING)
    private ExaminationStatus status;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private ExaminationType examinationType;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "examining", joinColumns = @JoinColumn(name = "examination_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "doctor_id", referencedColumnName = "id"))
    private Set<Doctor> doctors = new HashSet<Doctor>();

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Room room;

    @Column
    private Integer discount;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Nurse nurse;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Clinic clinic;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Patient patient;

    @JsonIgnore
    @OneToOne(mappedBy = "examination", cascade = CascadeType.ALL)
    private ExaminationReport examinationReport;

    @Column
    private Integer doctorRating;

    @Column
    private Integer clinicRating;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private ClinicAdministrator clinicAdministrator;

    public Long getId() {
        return id;
    }

    public ExaminationKind getKind() {
        return kind;
    }

    public void setKind(ExaminationKind kind) {
        this.kind = kind;
    }

    public DateTimeInterval getInterval() {
        return interval;
    }

    public void setInterval(DateTimeInterval interval) {
        this.interval = interval;
    }

    public ExaminationStatus getStatus() {
        return status;
    }

    public void setStatus(ExaminationStatus status) {
        this.status = status;
    }

    public ExaminationType getExaminationType() {
        return examinationType;
    }

    public void setExaminationType(ExaminationType examinationType) {
        this.examinationType = examinationType;
    }

    public Set<Doctor> getDoctors() {
        return doctors;
    }

    public void setDoctors(Set<Doctor> doctors) {
        this.doctors = doctors;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Nurse getNurse() {
        return nurse;
    }

    public void setNurse(Nurse nurse) {
        this.nurse = nurse;
    }

    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public ExaminationReport getExaminationReport() {
        return examinationReport;
    }

    public void setExaminationReport(ExaminationReport examinationReport) {
        this.examinationReport = examinationReport;
    }

    public Integer getDoctorRating() {
        return doctorRating;
    }

    public void setDoctorRating(Integer doctorRating) {
        this.doctorRating = doctorRating;
    }

    public Integer getClinicRating() {
        return clinicRating;
    }

    public void setClinicRating(Integer clinicRating) {
        this.clinicRating = clinicRating;
    }

    public ClinicAdministrator getClinicAdministrator() {
        return clinicAdministrator;
    }

    public void setClinicAdministrator(ClinicAdministrator clinicAdministrator) {
        this.clinicAdministrator = clinicAdministrator;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Examination examination = (Examination) o;
        if (examination.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, examination.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
