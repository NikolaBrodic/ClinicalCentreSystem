package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.CreateDoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import ftn.tim16.ClinicalCentreSystem.service.ClinicAdministratorService;
import ftn.tim16.ClinicalCentreSystem.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
@RequestMapping(value = "/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ClinicAdministratorService clinicAdministratorService;

    @CrossOrigin()
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Doctor> create(@Valid  @RequestBody CreateDoctorDTO doctor) {
        /*TODO: Get a user using token and if it is admin you need to get his information. When you create a new
           exmainaton type you need to get information about clinic in which loged in admin works. */
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getClinicAdministrators().get(0);

        Doctor createdDoctor = doctorService.create(doctor,clinicAdministrator);
        if(createdDoctor == null){
            return new ResponseEntity<Doctor>(createdDoctor , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Doctor>(createdDoctor, HttpStatus.CREATED);
    }

    @CrossOrigin()
    @GetMapping(value="/all")
    public ResponseEntity<List<DoctorDTO>> getAllDoctorsForAdmin() {
        /*TODO: Get a user using token and if it is admin you need to get his information. When you create a new
           exmainaton type you need to get information about clinic in which loged in admin works. */
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getClinicAdministrators().get(0);
        return new ResponseEntity<>(doctorService.findAllDoctorsInClinic(clinicAdministrator.getClinic()), HttpStatus.OK);
    }

    @CrossOrigin()
    @GetMapping(value="/pageAll")
    public ResponseEntity<List<DoctorDTO>> getAllDoctorsForAdmin(Pageable page) {
        /*TODO: Get a user using token and if it is admin you need to get his information. When you create a new
           exmainaton type you need to get information about clinic in which loged in admin works. */
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getClinicAdministrators().get(0);
        return new ResponseEntity<>(doctorService.findAllDoctorsInClinic(clinicAdministrator.getClinic(),page), HttpStatus.OK);
    }
}
