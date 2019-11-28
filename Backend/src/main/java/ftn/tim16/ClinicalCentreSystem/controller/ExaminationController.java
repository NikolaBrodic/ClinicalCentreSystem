package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationPagingDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomPagingDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.service.ClinicAdministratorService;
import ftn.tim16.ClinicalCentreSystem.service.ClinicalCentreAdministratorService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeParseException;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/examination")
public class ExaminationController {

    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private ClinicAdministratorService clinicAdministratorService;

    @GetMapping(value="/get-awaiting")
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<ExaminationPagingDTO> getAwaitingExaminations(@RequestParam(value = "kind") String kind, Pageable page) {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();
        if(clinicAdministrator == null){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        try {
            return new ResponseEntity<ExaminationPagingDTO>(examinationService.getAwaitingExaminations(kind,clinicAdministrator,page), HttpStatus.OK);
        }catch (DateTimeParseException ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
