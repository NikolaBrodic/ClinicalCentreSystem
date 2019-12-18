package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.ExaminationReportDTO;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.service.DoctorService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationReportService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
import ftn.tim16.ClinicalCentreSystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;

@RestController
@RequestMapping(value = "/api/examination-report", produces = MediaType.APPLICATION_JSON_VALUE)
public class ExaminationReportController {

    @Autowired
    ExaminationReportService examinationReportService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    PatientService patientService;

    @Autowired
    ExaminationService examinationService;

    @PostMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ExaminationReportDTO> create(@PathVariable("id") Long patientId, @Valid @RequestBody ExaminationReportDTO examinationReportDTO) {
        Doctor doctor = doctorService.getLoginDoctor();
        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Patient patient = patientService.getPatient(patientId);
        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        LocalDateTime examinationStartTime = LocalDateTime.now();
        Examination ongoingExamination = examinationService.getOngoingExamination(patient.getId(), doctor.getId(), examinationStartTime);
        if (ongoingExamination == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        ExaminationReportDTO createdExaminationReportDTO = examinationReportService.create(doctor, ongoingExamination, examinationReportDTO);
        if (createdExaminationReportDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdExaminationReportDTO, HttpStatus.CREATED);
    }
}
