package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import ftn.tim16.ClinicalCentreSystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/patient")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientService patientService;

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

}
