package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.Examination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {

    List<Examination> findByRoomId(Long id);
    Examination findByIntervalId(Long id);
}
