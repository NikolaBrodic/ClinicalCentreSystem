package ftn.tim16.ClinicalCentreSystem.repository;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
