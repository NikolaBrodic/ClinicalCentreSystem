package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.service.ClinicService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/search-clinics")
public class SearchClinicsController {

    @Autowired
    ClinicService clinicService;

    @Autowired
    ExaminationService examinationService;

    @GetMapping(value = "/clinic/{date}")
    public ResponseEntity<Clinic> getAllClinicsBy(@PathVariable long intervalId) {
        Examination examination = examinationService.getExamination(intervalId);
        Clinic clinic = clinicService.findById(intervalId);
        return new ResponseEntity<>(clinic, HttpStatus.OK);
    }

}
