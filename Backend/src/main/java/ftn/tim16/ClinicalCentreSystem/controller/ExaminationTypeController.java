package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypePagingDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import ftn.tim16.ClinicalCentreSystem.service.ClinicAdministratorService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/examination-type")
public class ExaminationTypeController {

    @Autowired
    private ExaminationTypeService examinationTypeService;

    @Autowired
    private ClinicAdministratorService clinicAdministratorService;


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<ExaminationType> create(@Valid @RequestBody ExaminationTypeDTO examinationType) {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();
        if (clinicAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        ExaminationType createdExaminationType = examinationTypeService.create(examinationType, clinicAdministrator);
        if (createdExaminationType == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ExaminationType>(createdExaminationType, HttpStatus.CREATED);
    }

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<List<ExaminationTypeDTO>> getAllExaminationTypesForAdmin() {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();
        if (clinicAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(examinationTypeService.findAllTypesInClinic(clinicAdministrator.getClinic()), HttpStatus.OK);
    }

    @GetMapping(value = "/pageAll")
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<ExaminationTypePagingDTO> getAllExaminationTypesForAdmin(Pageable page) {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();
        if (clinicAdministrator == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        ExaminationTypePagingDTO examinationTypePagingDTO = new ExaminationTypePagingDTO(
                examinationTypeService.findAllTypesInClinic(clinicAdministrator.getClinic(), page),
                examinationTypeService.findAllTypesInClinic(clinicAdministrator.getClinic()).size());
        return new ResponseEntity<>(examinationTypePagingDTO, HttpStatus.OK);
    }


}
