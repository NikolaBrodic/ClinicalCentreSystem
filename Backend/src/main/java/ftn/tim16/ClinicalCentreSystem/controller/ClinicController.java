package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.ClinicDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/clinic")
public class ClinicController {

    @Autowired
    ClinicService clinicService;

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<Clinic> getClinic(@PathVariable Long id) {
        Clinic clinic = clinicService.findById(id);
        if (clinic == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(clinic, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<Clinic> addClinic(@RequestBody ClinicDTO clinicDTO) {
        Clinic clinic = clinicService.create(clinicDTO);
        if (clinic == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(clinic, HttpStatus.OK);
    }

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<List<Clinic>> getAllClinics() {
        List<Clinic> allClinics = clinicService.findAll();
        return new ResponseEntity<>(allClinics, HttpStatus.OK);
    }
}
