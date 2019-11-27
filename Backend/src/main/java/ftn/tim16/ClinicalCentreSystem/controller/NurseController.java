package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.NurseDTO;
import ftn.tim16.ClinicalCentreSystem.dto.NursesPagingDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.service.ClinicAdministratorService;
import ftn.tim16.ClinicalCentreSystem.service.NurseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/nurse", produces = MediaType.APPLICATION_JSON_VALUE)
public class NurseController {

    @Autowired
    NurseService nurseService;

    @Autowired
    ClinicAdministratorService clinicAdministratorService;

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<List<NurseDTO>> getAllNursesInClinic() {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();
        if (clinicAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(nurseService.getAllNursesInClinic(clinicAdministrator.getClinic().getId()), HttpStatus.OK);
    }

    @GetMapping(value = "/page-all")
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<NursesPagingDTO> getAllNursesInClinic(Pageable page) {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();
        if (clinicAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        NursesPagingDTO nursesPagingDTO = new NursesPagingDTO(
                nurseService.getAllNursesInClinic(clinicAdministrator.getClinic().getId(), page),
                nurseService.getAllNursesInClinic(clinicAdministrator.getClinic().getId()).size()
        );

        return new ResponseEntity<>(nursesPagingDTO, HttpStatus.OK);
    }
}
