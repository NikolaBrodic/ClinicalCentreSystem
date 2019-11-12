package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;

import javax.persistence.Column;
import javax.validation.constraints.*;

public class CreateDoctorDTO {
    @NotEmpty(message = "First name is empty.")
    @Column(columnDefinition = "VARCHAR(30)", nullable = false)

    private String firstName;
    @NotEmpty(message = "Last name is empty.")
    @Column(columnDefinition = "VARCHAR(30)", nullable = false)
    private String lastName;

    @NotNull()
    @Column(nullable = false)
    private String workHoursFrom;

    @NotNull()
    @Column(nullable = false)
    private String workHoursTo;

    @NotEmpty(message = "Email is empty.")
    @Email(message ="Email is invalid.")
    @Column(unique = true, nullable = false)
    private String email;

    @NotEmpty(message = "Phone number is empty.")
    @Size(min=9, max=10)
    @Pattern(regexp = "0[0-9]+")
    private String phoneNumber;

    @NotNull
    private ExaminationType specialized;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public String getWorkHoursFrom() {
        return workHoursFrom;
    }

    public void setWorkHoursFrom(String workHoursFrom) {
        this.workHoursFrom = workHoursFrom;
    }

    public String getWorkHoursTo() {
        return workHoursTo;
    }

    public void setWorkHoursTo(String workHoursTo) {
        this.workHoursTo = workHoursTo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ExaminationType getSpecialized() {
        return specialized;
    }

    public void setSpecialized(ExaminationType specialized) {
        this.specialized = specialized;
    }
}
