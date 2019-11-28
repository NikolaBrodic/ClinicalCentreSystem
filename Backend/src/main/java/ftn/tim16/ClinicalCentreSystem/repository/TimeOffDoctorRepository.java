package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.model.TimeOffDoctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimeOffDoctorRepository extends JpaRepository<TimeOffDoctor, Long> {

    List<TimeOffDoctor> findByDoctorId(Long id);
}
