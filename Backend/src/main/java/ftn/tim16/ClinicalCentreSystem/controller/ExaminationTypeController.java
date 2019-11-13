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
    @GetMapping(value="/all")
    public ResponseEntity<List<ExaminationTypeDTO>> getAllExaminationTypesForAdmin() {
        /*TODO: Get a user using token and if it is admin you need to get his information. When you create a new
           exmainaton type you need to get information about clinic in which loged in admin works. */
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getClinicAdministrators().get(0);
        return new ResponseEntity<>(examinationTypeService.findAllTypesInClinic(clinicAdministrator.getClinic()), HttpStatus.OK);
    }
}
