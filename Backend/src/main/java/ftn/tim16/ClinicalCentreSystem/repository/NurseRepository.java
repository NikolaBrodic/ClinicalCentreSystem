package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NurseRepository extends JpaRepository<Nurse, Long> {

    Nurse findByEmail(String email);

    Nurse getById(Long id);

    Nurse findByIdAndStatus(Long id, UserStatus userStatus);

    Nurse findByPhoneNumber(String phoneNumber);

    List<Nurse> findAllByClinicId(Long id);

    Page<Nurse> findAllByClinicId(Long id, Pageable page);

    List<Nurse> findByClinicId(Long id);

    List<Nurse> findByStatus(UserStatus userStatus);
}
