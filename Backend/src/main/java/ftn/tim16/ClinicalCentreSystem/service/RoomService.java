package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.AssignExaminationDTO;
import ftn.tim16.ClinicalCentreSystem.dto.CreateRoomDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomPagingDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Room;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoomService {

    Room findById(Long id);

    Room create(CreateRoomDTO roomDTO, ClinicAdministrator clinicAdministrator);

    Room assignRoom(AssignExaminationDTO examination, ClinicAdministrator clinicAdministrator);

    void automaticallyAssignRoom();

    List<RoomDTO> findAllRoomsInClinic(Clinic clinic);

    RoomPagingDTO findAllRoomsInClinic(String kind, Clinic clinic, Pageable page, String search, String date, String searchStartTime, String searchEndTime);

    List<RoomDTO> getAvailableExaminationRooms(Long clinicId, String startDateTime, String endDateTime);

    Room deleteRoom(Long clinic_id, Long room_id);
}
