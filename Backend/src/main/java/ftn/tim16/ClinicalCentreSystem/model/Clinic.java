package ftn.tim16.ClinicalCentreSystem.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "VARCHAR(50)", nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String address;

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<Examination> examinations = new HashSet<>();

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<Doctor> doctors = new HashSet<>();

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<Nurse> nurses = new HashSet<>();

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<Room> rooms = new HashSet<>();

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<ExaminationType> examinationTypes = new HashSet<>();

    @OneToMany(mappedBy = "clinic", fetch = FetchType.LAZY)
    private Set<ClinicAdministrator> clinicAdministrators = new HashSet<>();

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public Set<Examination> getExaminations() {
        return examinations;
    }

    public void setExaminations(Set<Examination> examinations) {
        this.examinations = examinations;
    }

    public Set<Doctor> getDoctors() {
        return doctors;
    }

    public void setDoctors(Set<Doctor> doctors) {
        this.doctors = doctors;
    }

    public Set<Nurse> getNurses() {
        return nurses;
    }

    public void setNurses(Set<Nurse> nurses) {
        this.nurses = nurses;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }

    public Set<ExaminationType> getExaminationTypes() {
        return examinationTypes;
    }

    public void setExaminationTypes(Set<ExaminationType> examinationTypes) {
        this.examinationTypes = examinationTypes;
    }

    public Set<ClinicAdministrator> getClinicAdministrators() {
        return clinicAdministrators;
    }

    public void setClinicAdministrators(Set<ClinicAdministrator> clinicAdministrators) {
        this.clinicAdministrators = clinicAdministrators;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
