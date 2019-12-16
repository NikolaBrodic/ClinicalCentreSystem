package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.response.TimeOffDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.service.DoctorService;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/time-off-doctor")
public class TimeOffDoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private TimeOffDoctorService timeOffDoctorService;

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<TimeOffDTO>> getAllTimeOffForDoctor() {
        Doctor doctor = doctorService.getLoginDoctor();
        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        try {
            List<TimeOffDTO> timeOffDoctors = timeOffDoctorService.findByDoctorIdAndStatus(doctor.getId(), TimeOffStatus.APPROVED);
            return new ResponseEntity<>(timeOffDoctors, HttpStatus.OK);
        } catch (DateTimeParseException ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
