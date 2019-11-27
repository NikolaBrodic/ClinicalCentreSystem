package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {

    List<Examination> findByRoomId(Long id);

    List<Examination> findByClinicAdministratorIdAndStatusAndKind(Long id, ExaminationStatus status, ExaminationKind kind);

    Page<Examination> findByClinicAdministratorIdAndStatusAndKind(Long id, ExaminationStatus status, ExaminationKind kind, Pageable page);
}
