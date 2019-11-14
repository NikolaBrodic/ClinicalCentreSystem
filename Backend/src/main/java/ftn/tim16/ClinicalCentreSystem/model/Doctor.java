package ftn.tim16.ClinicalCentreSystem.model;

import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Email is empty.")
    @Email(message ="Email is invalid.")
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @NotEmpty(message = "First name is empty.")
    @Column(columnDefinition = "VARCHAR(30)", nullable = false)
    private String firstName;

    @NotEmpty(message = "Last name is empty.")
    @Column(columnDefinition = "VARCHAR(30)", nullable = false)
    private String lastName;

    @NotEmpty(message = "Phone number is empty.")
    @Size(min=9, max=10)
    @Pattern(regexp = "0[0-9]+")
    @Column(columnDefinition = "VARCHAR(11)", unique = true, nullable = false)
    private String phoneNumber;

    @NotNull
    @Column(nullable = false)
    private LocalTime workHoursFrom;

    @NotNull
    @Column(nullable = false)
    private LocalTime workHoursTo;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Clinic clinic;

    @ManyToMany(mappedBy = "doctors")
    private Set<Examination> examinations = new HashSet<Examination>();

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private ExaminationType specialized;

    @OneToMany(mappedBy = "doctor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<TimeOffDoctor> timeOffDoctors = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private DoctorStatus status;
    public Doctor(){

    }
    public Doctor(@NotEmpty(message = "Email is empty.") @Email(message = "Email is invalid.") String email, String password, @NotEmpty(message = "First name is empty.") String firstName, @NotEmpty(message = "Last name is empty.") String lastName, @NotEmpty(message = "Phone number is empty.") @Size(min = 9, max = 10) @Pattern(regexp = "0[0-9]+") String phoneNumber, @NotNull() LocalTime workHoursFrom, @NotNull() LocalTime workHoursTo, Clinic clinic, ExaminationType specialized, DoctorStatus status) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.workHoursFrom = workHoursFrom;
        this.workHoursTo = workHoursTo;
        this.clinic = clinic;
        this.specialized = specialized;
        this.status = status;
        this.timeOffDoctors = new HashSet<>();
        this.examinations = new HashSet<Examination>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public DoctorStatus getStatus() {
        return status;
    }

    public void setStatus(DoctorStatus status) {
        this.status = status;
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

    public ExaminationType getSpecialized() {
        return specialized;
    }

    public void setSpecialized(ExaminationType specialized) {
        this.specialized = specialized;
    }

    public Set<TimeOffDoctor> getTimeOffDoctors() {
        return timeOffDoctors;
    }

    public void setTimeOffDoctors(Set<TimeOffDoctor> timeOffDoctors) {
        this.timeOffDoctors = timeOffDoctors;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Doctor doctor = (Doctor) o;
        if (doctor.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, doctor.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
