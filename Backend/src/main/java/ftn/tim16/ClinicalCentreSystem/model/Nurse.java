package ftn.tim16.ClinicalCentreSystem.model;

import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Nurse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(columnDefinition = "VARCHAR(30)", nullable = false)
    private String firstName;

    @Column(columnDefinition = "VARCHAR(30)", nullable = false)
    private String lastName;

    @Column(columnDefinition = "VARCHAR(11)", unique = true, nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private LocalTime workHoursFrom;

    @Column(nullable = false)
    private LocalTime workHoursTo;

    @ManyToOne(fetch = FetchType.EAGER)
    private Clinic clinic;

    @OneToMany(mappedBy = "nurse", fetch = FetchType.LAZY)
    private Set<Examination> examinations = new HashSet<>();

    @OneToMany(mappedBy = "nurse", fetch = FetchType.LAZY)
    private Set<Prescription> prescriptions = new HashSet<>();

    @OneToMany(mappedBy = "nurse", fetch = FetchType.LAZY)
    private Set<TimeOffNurse> timeOffNurses = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalTime getWorkHoursFrom() {
        return workHoursFrom;
    }

    public void setWorkHoursFrom(LocalTime workHoursFrom) {
        this.workHoursFrom = workHoursFrom;
    }

    public LocalTime getWorkHoursTo() {
        return workHoursTo;
    }

    public void setWorkHoursTo(LocalTime workHoursTo) {
        this.workHoursTo = workHoursTo;
    }

    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public Set<Examination> getExaminations() {
        return examinations;
    }

    public void setExaminations(Set<Examination> examinations) {
        this.examinations = examinations;
    }

    public Set<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(Set<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public Set<TimeOffNurse> getTimeOffNurses() {
        return timeOffNurses;
    }

    public void setTimeOffNurses(Set<TimeOffNurse> timeOffNurses) {
        this.timeOffNurses = timeOffNurses;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }
}