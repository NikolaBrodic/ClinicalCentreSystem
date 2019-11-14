package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/clinical-centre-admin")
public class ClinicalCentreAdministratorController {

    @Autowired
    private PatientService patientService;

    @CrossOrigin
    @GetMapping(value = "/all-requests-to-register")
    public ResponseEntity<List<AwaitingApprovalPatientDTO>> getAllRequestsToRegister() {
        return new ResponseEntity<>(patientService.findByStatus(PatientStatus.AWAITING_APPROVAL), HttpStatus.OK);
    }
}
