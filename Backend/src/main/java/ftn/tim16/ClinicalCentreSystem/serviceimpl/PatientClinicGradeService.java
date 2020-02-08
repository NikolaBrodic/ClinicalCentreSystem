package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.model.grading.PatientClinicGrades;
import ftn.tim16.ClinicalCentreSystem.repository.PatientClinicGradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientClinicGradeService {
    @Autowired
    private PatientClinicGradeRepository patientClinicGradesRepository;

    public List<PatientClinicGrades> findClinicGrades(Long id) { return patientClinicGradesRepository.findClinicGrades(id); }
    public PatientClinicGrades save(PatientClinicGrades grade) {return patientClinicGradesRepository.save(grade);}

}
