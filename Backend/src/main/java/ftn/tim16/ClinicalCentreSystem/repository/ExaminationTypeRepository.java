package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExaminationTypeRepository extends JpaRepository<ExaminationType, Long> {

    ExaminationType findByLabelIgnoringCase(String label);

}
