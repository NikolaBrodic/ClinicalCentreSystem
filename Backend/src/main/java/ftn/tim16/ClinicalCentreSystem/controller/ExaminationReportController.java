package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.ExaminationReportDTO;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationReport;
import ftn.tim16.ClinicalCentreSystem.service.DoctorService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationReportService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
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
    private ExaminationReportService examinationReportService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ExaminationService examinationService;

    @PostMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ExaminationReportDTO> create(@PathVariable("id") Long examinationId, @Valid @RequestBody ExaminationReportDTO examinationReportDTO) {
        Doctor doctor = doctorService.getLoginDoctor();
        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Examination examination = examinationService.getExamination(examinationId);
        if (examination == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        LocalDateTime examinationTime = LocalDateTime.now();
        Examination ongoingExamination = examinationService.getOngoingExamination(examination.getPatient().getId(), doctor.getId(), examinationTime);
        if (ongoingExamination == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ExaminationReport existingExaminationReport = examinationReportService.findByExaminationId(ongoingExamination.getId());
        if (existingExaminationReport != null) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }

        ExaminationReportDTO createdExaminationReportDTO = examinationReportService.create(doctor, ongoingExamination, examinationReportDTO);
        if (createdExaminationReportDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdExaminationReportDTO, HttpStatus.CREATED);
    }
}
