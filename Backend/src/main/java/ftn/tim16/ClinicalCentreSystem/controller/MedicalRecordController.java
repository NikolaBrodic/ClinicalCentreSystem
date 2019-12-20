package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.MedicalRecordDTO;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.MedicalRecord;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.service.DoctorService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
import ftn.tim16.ClinicalCentreSystem.service.MedicalRecordService;
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
@RequestMapping(value = "/api/medical-record", produces = MediaType.APPLICATION_JSON_VALUE)
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ExaminationService examinationService;

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<MedicalRecordDTO> getPatientMedicalRecord(@PathVariable("id") Long patientId) {
        Patient patient = patientService.getPatient(patientId);
        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        MedicalRecord medicalRecord = medicalRecordService.findByPatientId(patient.getId());
        if (medicalRecord == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(new MedicalRecordDTO(medicalRecord), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<MedicalRecordDTO> editPatientMedicalInfo(@PathVariable("id") Long examinationId, @Valid @RequestBody MedicalRecordDTO medicalRecordDTO) {
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
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        MedicalRecordDTO updatedMedicalRecordDTO = medicalRecordService.update(medicalRecordDTO);
        if (updatedMedicalRecordDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(updatedMedicalRecordDTO, HttpStatus.CREATED);
    }

}
