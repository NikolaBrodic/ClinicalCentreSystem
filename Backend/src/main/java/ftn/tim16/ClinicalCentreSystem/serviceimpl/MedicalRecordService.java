package ftn.tim16.ClinicalCentreSystem.serviceimpl;


import ftn.tim16.ClinicalCentreSystem.model.MedicalRecord;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.repository.MedicalRecordRepository;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MedicalRecordService {
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    public MedicalRecord findByPatientId(Long id) {
        Patient p = patientRepository.findOneById(id);
        return medicalRecordRepository.findByPatient(p);
    }
}
