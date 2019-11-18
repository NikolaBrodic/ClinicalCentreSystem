package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByLabelIgnoringCase(String label);


    List<Room> findByClinicIdAndStatus(Long id, LogicalStatus status);
    Page<Room> findByClinicIdAndStatus(Long id, LogicalStatus status, Pageable page);
}
