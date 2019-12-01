package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.ClinicDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.service.ClinicService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
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

    @Autowired
    ExaminationService examinationService;

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<ClinicDTO> getClinic(@PathVariable Long id) {
        ClinicDTO clinicDTO = clinicService.findById(id);
        if (clinicDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(clinicDTO, HttpStatus.OK);
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

    @GetMapping(value = "/patient/all")
    public ResponseEntity<List<Clinic>> getAllPatientClinics() {
        List<Clinic> allClinics = clinicService.findAll();
        return new ResponseEntity<>(allClinics, HttpStatus.OK);
    }

    @GetMapping(value = "/patient/examinations-history")
    public ResponseEntity<List<Examination>> getExaminationHistory() {
        List<Examination> allExaminations = examinationService.findAll();
        return new ResponseEntity<>(allExaminations, HttpStatus.OK);
    }

}
