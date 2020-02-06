package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.MedicalRecordDTO;
import ftn.tim16.ClinicalCentreSystem.model.MedicalRecord;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.service.PatientService;
import ftn.tim16.ClinicalCentreSystem.serviceimpl.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/medicalRecord")
public class MedicalRecordController {

    @Autowired
    PatientService patientService;

    @Autowired
    MedicalRecordService medicalRecordService;

    @GetMapping(value = "/getMedicalRecord")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> getMedicalRecord(){
        Patient patient = patientService.getLoginPatient();
        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        MedicalRecord mr = medicalRecordService.findByPatientId(patient.getId());
        return new ResponseEntity<>(new MedicalRecordDTO(mr),HttpStatus.OK);
    }
}
