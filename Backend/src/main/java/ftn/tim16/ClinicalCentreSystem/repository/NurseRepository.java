package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NurseRepository extends JpaRepository<Nurse, Long> {

    Nurse findByEmail(String email);

    Nurse findByPhoneNumber(String phoneNumber);

    List<Nurse> findAllByClinicId(Long id);
}
