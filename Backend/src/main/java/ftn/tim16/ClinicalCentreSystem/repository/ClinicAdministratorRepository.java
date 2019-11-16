package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClinicAdministratorRepository extends JpaRepository<ClinicAdministrator, Long> {
    List<ClinicAdministrator> findAll();
    ClinicAdministrator getById(Long id);
    ClinicAdministrator findByEmail(String email);
}
