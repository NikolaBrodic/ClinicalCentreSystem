package ftn.tim16.ClinicalCentreSystem.repository;

import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByLabelIgnoringCase(String label);

    Room getById(Long id);

    List<Room> findByClinicIdAndStatus(Long id, LogicalStatus status);

    Page<Room> findByClinicIdAndStatusAndKind(Long id, LogicalStatus status, ExaminationKind kind, Pageable page);

    List<Room> findByClinicIdAndStatusAndKind(Long id, LogicalStatus status, ExaminationKind kind);

    List<Room> findByLabelContainsIgnoringCaseAndClinicIdAndStatusAndKind(String label, Long id, LogicalStatus status, ExaminationKind kind);

    Page<Room> findByLabelContainsIgnoringCaseAndClinicIdAndStatusAndKind(String label, Long id, LogicalStatus status, ExaminationKind kind, Pageable page);

    //List<Room> findAllByIdAndClinicIdAndStatusAndKind(Iterable<Long> iterable,Long id, LogicalStatus status, ExaminationKind kind);
    //List<Room> findByClinicIdAndStatusAndKind(Long id, LogicalStatus status,ExaminationKind kind,Example<Room> example);
    //Page<Room> findByClinicIdAndStatusAndKind(Long id, LogicalStatus status,ExaminationKind kind,Example<Room> example,Pageable pageable);
}
