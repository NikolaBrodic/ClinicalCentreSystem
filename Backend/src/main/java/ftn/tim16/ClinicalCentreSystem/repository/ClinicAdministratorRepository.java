package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicAdministratorRepository extends JpaRepository<ClinicAdministrator, Long> {
    List<ClinicAdministrator> findAll();

    ClinicAdministrator getById(Long id);

    ClinicAdministrator findByEmail(String email);

    List<ClinicAdministrator> findByClinicId(Long id);
}
