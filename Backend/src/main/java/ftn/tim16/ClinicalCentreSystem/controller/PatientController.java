package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.PatientPagingDTO;
import ftn.tim16.ClinicalCentreSystem.dto.PatientWithIdDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import ftn.tim16.ClinicalCentreSystem.service.DoctorService;
import ftn.tim16.ClinicalCentreSystem.service.NurseService;
import ftn.tim16.ClinicalCentreSystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
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
    @PreAuthorize("hasAnyRole('PATIENT')")
    public ResponseEntity<List<DoctorDTO>> getAllDoctorsBy(@RequestParam(value = "firstName") String firstName,
                                                           @RequestParam(value = "lastName") String lastName,
                                                           @RequestParam(value = "averageRating") int doctorRating) {

        List<DoctorDTO> listOfDoctors = doctorService.findByFirstNameAndLastNameAndDoctorRating(firstName, lastName, doctorRating);
        return new ResponseEntity<>(listOfDoctors, HttpStatus.OK);
    }
}
