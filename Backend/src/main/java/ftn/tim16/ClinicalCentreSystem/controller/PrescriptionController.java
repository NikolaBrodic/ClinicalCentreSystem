package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.response.PrescriptionDTO;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import ftn.tim16.ClinicalCentreSystem.service.NurseService;
import ftn.tim16.ClinicalCentreSystem.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/prescription")
public class PrescriptionController {

    @Autowired
    PrescriptionService prescriptionService;

    @Autowired
    NurseService nurseService;

    @GetMapping(value = "/all-for-nurse")
    @PreAuthorize("hasRole('NURSE')")
    public ResponseEntity<List<PrescriptionDTO>> getAllPrescriptionsForNurse() {
        Nurse nurse = nurseService.getLoginNurse();
        if (nurse == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        List<PrescriptionDTO> prescriptionsForNurse = prescriptionService.getPrescriptionsForNurse(nurse.getId());

        return new ResponseEntity<>(prescriptionsForNurse, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('NURSE')")
    public ResponseEntity<PrescriptionDTO> stampPrescription(@PathVariable("id") Long prescriptionId) {
        Nurse nurse = nurseService.getLoginNurse();
        if (nurse == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        PrescriptionDTO stampedPrescriptionDTO = prescriptionService.stampPrescription(prescriptionId, nurse.getId());
        if (stampedPrescriptionDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(stampedPrescriptionDTO, HttpStatus.OK);
    }

}
