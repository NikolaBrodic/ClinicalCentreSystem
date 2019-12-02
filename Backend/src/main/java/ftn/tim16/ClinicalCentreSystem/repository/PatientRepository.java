package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByStatus(PatientStatus patientStatus);

    Patient findByEmail(String email);

    Patient findByHealthInsuranceID(String healthInsuranceID);

    Patient findByPhoneNumber(String phoneNumber);

    Page<Patient> findDistinctByExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIDContainsAndExaminationsStatusOrExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIDContainsAndExaminationsStatus(
            Long id, PatientStatus status, String firstName, String lastName, String healthInsuranceID, ExaminationStatus exStatus,
            Long id2, PatientStatus status2, String firstName2, String lastName2, String healthInsuranceID2, ExaminationStatus exStatus2, Pageable page);

    List<Patient> findDistinctByExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIDContainsAndExaminationsStatusOrExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIDContainsAndExaminationsStatus(
            Long id, PatientStatus status, String firstName, String lastName, String healthInsuranceID, ExaminationStatus exStatus,
            Long id2, PatientStatus status2, String firstName2, String lastName2, String healthInsuranceID2, ExaminationStatus exStatus2);
}
