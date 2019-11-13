package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import ftn.tim16.ClinicalCentreSystem.service.ClinicAdministratorService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/examination-type")
public class ExaminationTypeController {

    @Autowired
    private ExaminationTypeService examinationTypeService;

    @Autowired
    private ClinicAdministratorService clinicAdministratorService;
    @CrossOrigin()
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExaminationType> create(@Valid  @RequestBody ExaminationType examinationType) {
        /*TODO: Get a user using token and if it is admin you need to get his information. When you create a new
           exmainaton type you need to get information about clinic in which loged in admin works. */
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getClinicAdministrators().get(0);

        ExaminationType createdExaminationType = examinationTypeService.create(examinationType,clinicAdministrator);
        if(createdExaminationType == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ExaminationType>(createdExaminationType, HttpStatus.CREATED);
    }
    @CrossOrigin()
    @GetMapping(value="/all")
    public ResponseEntity<List<ExaminationTypeDTO>> getAllExaminationTypesForAdmin() {
        /*TODO: Get a user using token and if it is admin you need to get his information. When you create a new
           exmainaton type you need to get information about clinic in which loged in admin works. */
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getClinicAdministrators().get(0);
        return new ResponseEntity<>(examinationTypeService.findAllTypesInClinic(clinicAdministrator.getClinic()), HttpStatus.OK);
    }
    @CrossOrigin()
    @GetMapping(value="/pageAll")
    public ResponseEntity<List<ExaminationTypeDTO>> getAllExaminationTypesForAdmin(Pageable page) {
        /*TODO: Get a user using token and if it is admin you need to get his information. When you create a new
           exmainaton type you need to get information about clinic in which loged in admin works. */
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getClinicAdministrators().get(0);
        return new ResponseEntity<>(examinationTypeService.findAllTypesInClinic(clinicAdministrator.getClinic(),page), HttpStatus.OK);
    }

}
