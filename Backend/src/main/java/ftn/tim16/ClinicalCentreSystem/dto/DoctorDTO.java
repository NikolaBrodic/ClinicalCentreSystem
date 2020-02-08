package ftn.tim16.ClinicalCentreSystem.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;

import java.time.LocalTime;

public class DoctorDTO {

    private Long id;

    private String firstName;

    private String lastName;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime workHoursFrom;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime workHoursTo;

    private String email;

    private String password;

    private ExaminationType specialized;

    private String phoneNumber;

    private Integer doctorRating;

    public DoctorDTO() {

    }

    public DoctorDTO(Long id, String phoneNumber, String firstName, String lastName, LocalTime workHoursFrom, LocalTime workHoursTo, String email, String password, ExaminationType specialized) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.workHoursFrom = workHoursFrom;
        this.workHoursTo = workHoursTo;
        this.email = email;
        this.password = password;
        this.specialized = specialized;
    }



    public DoctorDTO(Doctor doctor) {
        this(doctor.getId(), doctor.getPhoneNumber(), doctor.getFirstName(), doctor.getLastName(), doctor.getWorkHoursFrom(), doctor.getWorkHoursTo(), doctor.getEmail(),
                doctor.getPassword(), doctor.getSpecialized());
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public ExaminationType getSpecialized() {
        return specialized;
    }

    public void setSpecialized(ExaminationType specialized) {
        this.specialized = specialized;
    }

    public Integer getDoctorRating() {
        return doctorRating;
    }

    public void setDoctorRating(Integer doctorRating) {
        this.doctorRating = doctorRating;
    }
}
