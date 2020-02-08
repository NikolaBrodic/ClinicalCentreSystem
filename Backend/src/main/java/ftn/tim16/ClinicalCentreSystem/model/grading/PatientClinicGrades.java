package ftn.tim16.ClinicalCentreSystem.model.grading;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.Patient;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class PatientClinicGrades {
    @EmbeddedId
    private PatientClinicId id = new PatientClinicId();


    @ManyToOne
    @MapsId("patient_id")
    private Patient patient;

    @ManyToOne
    @MapsId("clinic_id")
    private Clinic clinic;

    @Column(name = "grade")
    private double grade;

    public PatientClinicId getId() {
        return id;
    }

    public void setId(PatientClinicId id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }

    @Embeddable
    public static class PatientClinicId implements Serializable {

        private static final long serialVersionUID = 1L;

        private Long patient_id;
        private Long clinic_id;

        public PatientClinicId() {

        }

        public PatientClinicId(Long patient_id, Long doctor_id) {
            super();
            this.patient_id = patient_id;
            this.clinic_id = doctor_id;
        }

        @Override
        public int hashCode() {
            final int prime = 31;
            int result = 1;
            result = prime * result
                    + ((patient_id == null) ? 0 : patient_id.hashCode());
            result = prime * result
                    + ((clinic_id == null) ? 0 : clinic_id.hashCode());
            return result;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (getClass() != obj.getClass())
                return false;
            PatientClinicId other = (PatientClinicId) obj;
            return Objects.equals(getClinic_id(), other.getClinic_id()) && Objects.equals(getPatient_id(), other.getPatient_id());
        }

        public static long getSerialVersionUID() {
            return serialVersionUID;
        }

        public Long getPatient_id() {
            return patient_id;
        }

        public void setPatient_id(Long patient_id) {
            this.patient_id = patient_id;
        }

        public Long getClinic_id() {
            return clinic_id;
        }

        public void setClinic_id(Long clinic_id) {
            this.clinic_id = clinic_id;
        }
    }
}
