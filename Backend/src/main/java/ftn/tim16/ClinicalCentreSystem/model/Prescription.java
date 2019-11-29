package ftn.tim16.ClinicalCentreSystem.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Medicine medicine;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private ExaminationReport examinationReport;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Nurse nurse;

    public Long getId() {
        return id;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public ExaminationReport getExaminationReport() {
        return examinationReport;
    }

    public void setExaminationReport(ExaminationReport examinationReport) {
        this.examinationReport = examinationReport;
    }

    public Nurse getNurse() {
        return nurse;
    }

    public void setNurse(Nurse nurse) {
        this.nurse = nurse;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Prescription prescription = (Prescription) o;
        if (prescription.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, prescription.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
