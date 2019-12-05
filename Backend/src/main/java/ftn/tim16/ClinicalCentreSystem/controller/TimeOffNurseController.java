package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import ftn.tim16.ClinicalCentreSystem.model.TimeOffNurse;
import ftn.tim16.ClinicalCentreSystem.service.NurseService;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffNurseService;
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
@RequestMapping(value = "/api/time-off-nurse")
public class TimeOffNurseController {

    @Autowired
    private NurseService nurseService;

    @Autowired
    private TimeOffNurseService timeOffNurseService;

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('NURSE')")
    public ResponseEntity<List<TimeOffNurse>> getAllTimeOffForDoctor() {
        Nurse nurse = nurseService.getLoginNurse();
        if (nurse == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        try {
            List<TimeOffNurse> timeOffNurses = timeOffNurseService.findByNurseIdAndStatus(nurse.getId(), TimeOffStatus.APPROVED);
            return new ResponseEntity<>(timeOffNurses, HttpStatus.OK);
        } catch (DateTimeParseException ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
