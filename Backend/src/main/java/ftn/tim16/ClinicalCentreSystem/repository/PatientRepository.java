package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByStatus(PatientStatus patientStatus);

    Patient findByEmail(String email);

    Patient findByHealthInsuranceID(String healthInsuranceID);

    Patient findByPhoneNumber(String phoneNumber);
}
