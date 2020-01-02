package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {
    Clinic findOneById(Long id);

    Clinic findByNameIgnoringCase(String name);

    Clinic findByAddressIgnoringCase(String address);

    List<Clinic> findAll();

    List<Clinic> findByExaminations(Examination examination);

    List<Clinic> findByAddressContainsIgnoringCaseOrClinicRatingIsGreaterThanEqual(
            String address, int clinicRating);
}
