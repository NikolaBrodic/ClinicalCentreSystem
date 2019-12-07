package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Doctor findByEmailIgnoringCase(String email);

    Doctor findByPhoneNumber(String phoneNumber);

    List<Doctor> findByClinicIdAndStatusNot(Long id, DoctorStatus status);

    Page<Doctor> findByClinicIdAndStatusNot(Long id, DoctorStatus status, Pageable page);

    Doctor findByEmail(String email);

    List<Doctor> findByFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndDoctorRating(String firstName, String lastName, int doctorRating);

    List<Doctor> findByClinicIdAndSpecializedAndStatusNot(Long clinic_id, ExaminationType specialized, DoctorStatus status);

    List<Doctor> findByStatusNotAndClinicIdAndSpecializedId(DoctorStatus status, Long clinicId, Long specializedId);
}
