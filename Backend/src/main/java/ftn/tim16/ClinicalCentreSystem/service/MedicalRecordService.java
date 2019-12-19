package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.MedicalRecord;

public interface MedicalRecordService {

    MedicalRecord findByPatientId(Long patientId);

}
