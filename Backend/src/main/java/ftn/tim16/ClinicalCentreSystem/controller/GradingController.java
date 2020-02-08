package ftn.tim16.ClinicalCentreSystem.controller;


import ftn.tim16.ClinicalCentreSystem.dto.ClinicGradingDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorDTO;
import ftn.tim16.ClinicalCentreSystem.dto.DoctorGradingDTO;
import ftn.tim16.ClinicalCentreSystem.dto.ExaminationDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.model.grading.PatientClinicGrades;
import ftn.tim16.ClinicalCentreSystem.model.grading.PatientDoctorGrades;
import ftn.tim16.ClinicalCentreSystem.service.ClinicService;
import ftn.tim16.ClinicalCentreSystem.service.DoctorService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
import ftn.tim16.ClinicalCentreSystem.service.PatientService;
import ftn.tim16.ClinicalCentreSystem.serviceimpl.PatientClinicGradeService;
import ftn.tim16.ClinicalCentreSystem.serviceimpl.PatientDoctorGradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/grading")
public class GradingController {

    @Autowired
    PatientService patientService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    ClinicService clinicService;

    @Autowired
    PatientDoctorGradeService patientDoctorGradeService;

    @Autowired
    PatientClinicGradeService patientClinicGradeService;

    @Autowired
    ExaminationService examinationService;


    @PreAuthorize("hasRole('PATIENT')")
    @RequestMapping(consumes = "application/json",value="/makeGradeDoctor",method = RequestMethod.POST)
    public ResponseEntity<?> makeGradeDoctor(@RequestBody grade request) {
        Patient patient = patientService.getLoginPatient();
        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        PatientDoctorGrades a = new PatientDoctorGrades();
        a.setPatient(patient);
        a.setDoctor(doctorService.findOneById(request.doctorId));
        a.setGrade(request.value);
        patientDoctorGradeService.save(a);
        return new ResponseEntity<>( HttpStatus.OK);

    }

    static class grade{
        public Long doctorId;
        public Long patientId;
        public double value;
    }

    @PreAuthorize("hasRole('PATIENT')")
    @RequestMapping(consumes = "application/json",value="/makeGradeClinic",method = RequestMethod.POST)
    public ResponseEntity<?> makeGradeClinic(@RequestBody clinicGrade request) {
        Patient patient = patientService.getLoginPatient();
        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        PatientClinicGrades a = new PatientClinicGrades();
        a.setPatient(patient);
        a.setClinic(clinicService.findOneByName(request.clinicName));
        a.setGrade(request.value);
        System.out.println(a.getGrade()+" "+a.getPatient().getId()+" "+a.getClinic().getId());
        patientClinicGradeService.save(a);
        return new ResponseEntity<>( HttpStatus.OK);

    }
    static class clinicGrade{
        public String clinicName;
        public Long patientId;
        public double value;
    }

    @PreAuthorize("hasRole('PATIENT')")
    @RequestMapping(value="/doctorGrade",method = RequestMethod.GET)
    public ResponseEntity<?> doctorGrade() {
        List<DoctorGradingDTO> appDto = new ArrayList<>();
        List<Doctor> doctors = doctorService.findAll();
        for(Doctor d : doctors){
            appDto.add(new DoctorGradingDTO(d));
        }
        return new ResponseEntity<>(appDto, HttpStatus.OK);

    }

    @PreAuthorize("hasRole('PATIENT')")
    @RequestMapping(value="/clinicGrade",method = RequestMethod.GET)
    public ResponseEntity<?> clinicGrade() {
        List<Clinic> clinics = clinicService.findAll();
        List<ClinicGradingDTO> clinicGradingDTOS = new ArrayList<>();
        for(Clinic c : clinics){
           clinicGradingDTOS.add(new ClinicGradingDTO(c));
        }

        return new ResponseEntity<>(clinicGradingDTOS, HttpStatus.OK);

    }
}
