package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.RoomDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Room;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoomService {
    Room create(RoomDTO roomDTO, ClinicAdministrator clinicAdministrator);

    List<RoomDTO> findAllRoomsInClinic(Clinic clinic);
    List<RoomDTO> findAllRoomsInClinic(Clinic clinic, Pageable page);
}
