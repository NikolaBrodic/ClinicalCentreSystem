package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NurseRepository extends JpaRepository<Nurse, Long> {

    Nurse findByEmail(String email);
    Nurse getById(Long id);
    Nurse findByPhoneNumber(String phoneNumber);
    List<Nurse> findByClinicId(Long id);
    List<Nurse> findByStatus(UserStatus userStatus);
}
