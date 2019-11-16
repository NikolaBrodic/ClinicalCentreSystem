package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import ftn.tim16.ClinicalCentreSystem.security.PasswordHasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @PostMapping("/patient")
    public ResponseEntity<Void> createPatient(@RequestBody Patient patient) {
        String hashedPassword = PasswordHasher.encodeBCrypt(patient.getPassword());
        patient.setPassword(hashedPassword);

        Patient createdPatient = this.patientRepository.save(patient);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdPatient.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/patients/{id}")
    public Patient getPatient(@PathVariable long id) {
        return patientRepository.findById(id).get();
    }

    @GetMapping("/patients")
    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }

    @PutMapping("/patients/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable long id, @RequestBody Patient patient) {
        Patient patientUpdated = patientRepository.save(patient);
        return new ResponseEntity<>(patientUpdated, HttpStatus.OK);
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable long id) {
        this.patientRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/patient/login")
    public ResponseEntity<Patient> getPatientByEmail(@RequestBody Patient patient) {
        // Find a patient by his email address
        Patient existingPatient = this.patientRepository.findByEmail(patient.getEmail());

        // If the entered email address does not exist in the database - the user does not exist.
        if (existingPatient == null) {
            System.out.println("wrong email");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            // If the email exists, check if the password is correct.
            if (PasswordHasher.doesPasswordMatch(patient.getPassword(), existingPatient.getPassword())) {
                System.out.println("correct pwd");
                // If the password is correct then successfully login the user.
                return new ResponseEntity<>(existingPatient, HttpStatus.OK);
            } else {
                System.out.println("wrong pwd");
                // If the password is incorrect then login is denied.
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }
    }

}
