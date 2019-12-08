package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExaminationTypeRepository extends JpaRepository<ExaminationType, Long> {
    ExaminationType findByLabelIgnoringCase(String label);

    List<ExaminationType> findByClinicIdAndStatus(Long id, LogicalStatus status);

    Page<ExaminationType> findByClinicIdAndStatus(Long id, LogicalStatus status, Pageable page);

    ExaminationType findByIdAndStatusNot(Long id, LogicalStatus status);
}
