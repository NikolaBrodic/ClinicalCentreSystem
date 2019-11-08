package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.ExaminationReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExaminationReportRepository extends JpaRepository<ExaminationReport, Long> {
}
