package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.*;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import ftn.tim16.ClinicalCentreSystem.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/patient")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientService patientService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private NurseService nurseService;

    @Autowired
    private ClinicService clinicService;

    @Autowired
    private ExaminationService examinationService;

    @GetMapping(value = "/{id}")
    public Patient getPatient(@PathVariable long id) {
        return patientRepository.findById(id).get();
    }

    @GetMapping(value = "/all-patients")
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable long id, @RequestBody Patient patient) {
        Patient patientUpdated = patientRepository.save(patient);
        return new ResponseEntity<>(patientUpdated, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable long id) {
        this.patientRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/all-requests-to-register")
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<List<AwaitingApprovalPatientDTO>> getAllRequestsToRegister() {
        return new ResponseEntity<>(patientService.findByStatus(PatientStatus.AWAITING_APPROVAL), HttpStatus.OK);
    }

    @PutMapping(value = "/approve-request-to-register/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<Patient> approveRequestToRegister(@PathVariable Long id) {
        Patient updatedPatient = patientService.approveRequestToRegister(id);
        if (updatedPatient == null) {
            return new ResponseEntity<Patient>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Patient>(updatedPatient, HttpStatus.OK);
    }

    @PutMapping(value = "/reject-request-to-register/{id}")
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<Void> rejectRequestToRegister(@RequestBody String reason, @PathVariable Long id) {
        boolean success = patientService.rejectRequestToRegister(id, reason);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/pageAll")
    @PreAuthorize("hasAnyRole('DOCTOR','NURSE')")
    public ResponseEntity<PatientPagingDTO> getPatientsForMedicalStaffPaging(@RequestParam(value = "firstName") String firstName,
                                                                             @RequestParam(value = "lastName") String lastName,
                                                                             @RequestParam(value = "healthInsuranceId") String healthInsuranceId,
                                                                             Pageable page) {
        Doctor doctor = doctorService.getLoginDoctor();
        Long clinicId;
        if (doctor == null) {
            Nurse nurse = nurseService.getLoginNurse();
            if (nurse == null) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            clinicId = nurse.getClinic().getId();
        } else {
            clinicId = doctor.getClinic().getId();
        }

        try {
            PatientPagingDTO patientPagingDTO = patientService.
                    getPatientsForMedicalStaffPaging(clinicId, firstName, lastName, healthInsuranceId, page);
            return new ResponseEntity<>(patientPagingDTO, HttpStatus.OK);
        } catch (DateTimeParseException ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/forMedicalStaff/{id}")
    @PreAuthorize("hasAnyRole('DOCTOR','NURSE')")
    public ResponseEntity<PatientWithIdDTO> getPatientForMedicalStaff(@PathVariable long id) {
        PatientWithIdDTO patientWithIdDTO = patientService.getPatientForMedicalStaff(id);
        if (patientWithIdDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(patientWithIdDTO, HttpStatus.OK);
    }

    @GetMapping(value = "/profile")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<DoctorDTO>> getAllDoctorsBy(@RequestParam(value = "firstName") String firstName,
                                                           @RequestParam(value = "lastName") String lastName,
                                                           @RequestParam(value = "averageRating") int doctorRating) {

        List<DoctorDTO> listOfDoctors = doctorService.findByFirstNameAndLastNameAndDoctorRating(firstName, lastName, doctorRating);
        return new ResponseEntity<>(listOfDoctors, HttpStatus.OK);
    }

    @PostMapping(value = "/filter-clinics")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<Clinic>> filterClinicsBy(@RequestBody ExaminationType examinationType) {
        List<Clinic> filteredClinics = clinicService.findByExaminationTypesContainsIgnoringCase(examinationType);
        return new ResponseEntity<>(filteredClinics, HttpStatus.OK);
    }

    @GetMapping(value = "/examination-history/{patientId}")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<Examination>> getAllExaminationsForPatient(@PathVariable Long patientId) {
        // Filtered examinations get all examinations related to the logged in patient
        List<Examination> filteredExaminations = examinationService.getExaminationsForPatient(patientId);

        // However some examinations may be canceled so we have to add only those examinations which
        // are not canceled. This array list will hold that.
        List<Examination> availableStatus = new ArrayList<>();
        for (Examination examination : filteredExaminations) {
            if (examination.getStatus() != ExaminationStatus.CANCELED) {
                availableStatus.add(examination);
            }
        }

        // Return non-canceled examination history related for the logged in patient
        return new ResponseEntity<>(availableStatus, HttpStatus.OK);
    }

}
