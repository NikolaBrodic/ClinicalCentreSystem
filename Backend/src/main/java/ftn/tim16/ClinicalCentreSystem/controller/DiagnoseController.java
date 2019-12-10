package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.model.Diagnose;
import ftn.tim16.ClinicalCentreSystem.service.DiagnoseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/diagnose", produces = MediaType.APPLICATION_JSON_VALUE)
public class DiagnoseController {

    @Autowired
    DiagnoseService diagnoseService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<Diagnose> addDiagnose(@RequestBody Diagnose diagnose) {
        Diagnose createdDiagnose = diagnoseService.create(diagnose);
        if (createdDiagnose == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdDiagnose, HttpStatus.CREATED);
    }

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('CLINICAL_CENTRE_ADMIN')")
    public ResponseEntity<List<Diagnose>> getAllDiagnosis() {
        return new ResponseEntity<>(diagnoseService.findAll(), HttpStatus.OK);
    }

}
