package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.Diagnose;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiagnoseRepository extends JpaRepository<Diagnose, Long> {
}
