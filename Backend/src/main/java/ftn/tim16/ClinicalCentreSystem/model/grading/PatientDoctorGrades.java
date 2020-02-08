package ftn.tim16.ClinicalCentreSystem.model.grading;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Patient;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class PatientDoctorGrades {
    @EmbeddedId
    private PatientDoctorId id = new PatientDoctorId();

    @ManyToOne
    @MapsId("patient_id")
    private Patient patient;

    @ManyToOne
    @MapsId("doctor_id")
    private Doctor doctor;

    @Column(name = "grade")
    private double grade;

    public PatientDoctorId getId() {
        return id;
    }

    public void setId(PatientDoctorId id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }

    @Embeddable
    public static class PatientDoctorId implements Serializable {

        private static final long serialVersionUID = 1L;

        private Long patient_id;
        private Long doctor_id;

        public PatientDoctorId() {

        }

        public PatientDoctorId(Long patient_id, Long doctor_id) {
            super();
            this.patient_id = patient_id;
            this.doctor_id = doctor_id;
        }

        @Override
        public int hashCode() {
            final int prime = 31;
            int result = 1;
            result = prime * result
                    + ((patient_id == null) ? 0 : patient_id.hashCode());
            result = prime * result
                    + ((doctor_id == null) ? 0 : doctor_id.hashCode());
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
            PatientDoctorId other = (PatientDoctorId) obj;
            return Objects.equals(getDoctor_id(), other.getDoctor_id()) && Objects.equals(getPatient_id(), other.getPatient_id());
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

        public Long getDoctor_id() {
            return doctor_id;
        }

        public void setDoctor_id(Long doctor_id) {
            this.doctor_id = doctor_id;
        }
    }
}
