package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.model.grading.PatientDoctorGrades;
import ftn.tim16.ClinicalCentreSystem.repository.PatientDoctorGradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientDoctorGradeService {

    @Autowired
    private PatientDoctorGradeRepository patientDoctorGradesRepository;

    public List<PatientDoctorGrades> findAll() {return patientDoctorGradesRepository.findAll();}
    public List<PatientDoctorGrades> findDoctorGrades(Long id) { return patientDoctorGradesRepository.findDoctorGrades(id); }
    public PatientDoctorGrades save(PatientDoctorGrades a) {  return patientDoctorGradesRepository.save(a); }

}
