package ftn.tim16.ClinicalCentreSystem.controller;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.*;
import ftn.tim16.ClinicalCentreSystem.service.ClinicAdministratorService;
import ftn.tim16.ClinicalCentreSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ClinicAdministratorRepository clinicAdministratorRepository;

    @Autowired
    private ClinicalCentreAdministratorRepository clinicalCentreAdministratorRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private NurseRepository nurseRepository;

    @CrossOrigin()
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> changePassword(@Valid @RequestBody UserDTO userDTO) {
        /*TODO: Get a user using token. */
        //ClinicAdministrator user = clinicAdministratorRepository.findAll().get(0);
        //ClinicalCentreAdministrator  user = clinicalCentreAdministratorRepository.findAll().get(0);
        Doctor user = doctorRepository.findAll().get(0);
        //Patient user =patientRepository.findAll().get(0);
        //Nurse user =nurseRepository.findAll().get(0);
        if(!user.getPassword().equals(userDTO.getOldPassword())){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Object newUser = userService.changePassword(userDTO,user);

        if(newUser == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

}
