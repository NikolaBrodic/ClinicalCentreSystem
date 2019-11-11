package ftn.tim16.ClinicalCentreSystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class ExaminationType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Label is empty.")
    @Size(message="Max size for label is 30.",max = 30)
    @Column(unique = true, columnDefinition = "VARCHAR(30)", nullable = false)
    private String label;

    @NotNull(message="Price is null.")
    @Positive(message ="Price is not a positive number.")
    @Column(nullable = false, scale = 2)
    private Double price;

    @OneToMany(mappedBy = "specialized", fetch = FetchType.LAZY)
    private Set<Doctor> doctors = new HashSet<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Clinic clinic;

    @Enumerated(EnumType.STRING)
    private LogicalStatus status;

    @OneToMany(mappedBy = "examinationType", fetch = FetchType.LAZY)
    private Set<Examination> examinations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<Doctor> getDoctors() {
        return doctors;
    }

    public void setDoctors(Set<Doctor> doctors) {
        this.doctors = doctors;
    }

    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public LogicalStatus getStatus() {
        return status;
    }

    public void setStatus(LogicalStatus status) {
        this.status = status;
    }

    public Set<Examination> getExaminations() {
        return examinations;
    }

    public void setExaminations(Set<Examination> examinations) {
        this.examinations = examinations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExaminationType ExaminationType = (ExaminationType) o;
        if (ExaminationType.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, ExaminationType.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

}
