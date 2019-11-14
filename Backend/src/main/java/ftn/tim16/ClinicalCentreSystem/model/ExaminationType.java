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

    @Column(unique = true, columnDefinition = "VARCHAR(30)", nullable = false)
    private String label;

    @Column(nullable = false, scale = 2)
    private Double price;

    @OneToMany(mappedBy = "specialized", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Doctor> doctors = new HashSet<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Clinic clinic;

    @Enumerated(EnumType.STRING)
    private LogicalStatus status;

    @OneToMany(mappedBy = "examinationType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Examination> examinations = new HashSet<>();

    public ExaminationType(){

    }
    public ExaminationType(String label, Double price, Clinic clinic, LogicalStatus status) {
        this.label = label;
        this.price = price;
        this.clinic = clinic;
        this.status = status;
        this.examinations = new HashSet<>();
        this.doctors = new HashSet<>();
    }

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
