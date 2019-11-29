package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.ClinicalCentreAdministrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicalCentreAdministratorRepository extends JpaRepository<ClinicalCentreAdministrator, Long> {

    ClinicalCentreAdministrator findByEmail(String email);

    ClinicalCentreAdministrator findByPhoneNumber(String phoneNumber);

}
