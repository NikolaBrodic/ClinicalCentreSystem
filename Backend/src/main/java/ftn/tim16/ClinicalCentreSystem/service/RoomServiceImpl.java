package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.RoomDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomPagingDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Room;
import ftn.tim16.ClinicalCentreSystem.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService{

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room create(RoomDTO roomDTO, ClinicAdministrator clinicAdministrator) {
        if(roomRepository.findByLabelIgnoringCase(roomDTO.getLabel()) != null){
            return null;
        }
        ExaminationKind examinationKind = getKind(roomDTO.getKind());
        if(examinationKind == null){
            return null;
        }
        Room room = new Room(roomDTO.getLabel(),examinationKind,clinicAdministrator.getClinic());
        return roomRepository.save(room);
    }

    @Override
    public List<RoomDTO> findAllRoomsInClinic(Clinic clinic) {
        return convertToDTO(roomRepository.findByClinicIdAndStatus(clinic.getId(),LogicalStatus.EXISTING));
    }

    @Override
    public RoomPagingDTO findAllRoomsInClinic(String kind,Clinic clinic, Pageable page,String search,String date,String time) throws DateTimeParseException{
        ExaminationKind examinationKind = getKind(kind);
        if(examinationKind == null){
            return null;
        }
        if(search == null || search.isEmpty()){
            RoomPagingDTO roomPagingDTO = new RoomPagingDTO( convertToDTO(
                    roomRepository.findByClinicIdAndStatusAndKind(clinic.getId(),LogicalStatus.EXISTING,examinationKind,page)),
                    findAllRoomsInClinic(clinic).size());
            return roomPagingDTO;
        }

        List<Room> roomsInClinicAll = roomRepository.findByLabelContainsIgnoringCaseAndClinicIdAndStatusAndKind
                (search,clinic.getId(),LogicalStatus.EXISTING,examinationKind);
        Page<Room> roomsInClinicPage = roomRepository.findByLabelContainsIgnoringCaseAndClinicIdAndStatusAndKind
                (search,clinic.getId(),LogicalStatus.EXISTING,examinationKind,page);
        if(date == null || time == null ||date.isEmpty() || time.isEmpty()){
            return new RoomPagingDTO(convertToDTO(roomsInClinicPage), roomsInClinicAll.size());
        }
        LocalTime localTime = LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate localDate = LocalDate.parse(date, formatter);
        LocalDateTime localDateTime = LocalDateTime.of(localDate,localTime);

        List<Room> availableRoom = new ArrayList<>();
        for (Room currentRoom: roomsInClinicAll) {

        }
       // Page<Room> pageRooms = roomRepository.findAll(rooms,page);

        RoomPagingDTO roomPagingDTO = new RoomPagingDTO(convertToDTO(roomsInClinicPage), roomsInClinicAll.size());

        return roomPagingDTO;
    }


    private ExaminationKind getKind(String kind){
        try {
            return ExaminationKind.valueOf(kind.toUpperCase());
        }catch (Exception e){
            return null;
        }
    }

    private List<RoomDTO> convertToDTO(List<Room> rooms){
        if(rooms == null || rooms.isEmpty()){
            return new ArrayList<>();
        }
        List<RoomDTO> roomDTOS = new ArrayList<>();
        for (Room room : rooms) {
            roomDTOS.add(new RoomDTO(room));
        }
        return roomDTOS;
    }

    private List<RoomDTO> convertToDTO(Page<Room> rooms){
        if(rooms == null){
            return new ArrayList<>();
        }
        if(rooms.isEmpty()){
            return null;
        }
        List<RoomDTO> roomDTOS = new ArrayList<>();
        for (Room room : rooms) {
            roomDTOS.add(new RoomDTO(room));
        }
        return roomDTOS;
    }
}
