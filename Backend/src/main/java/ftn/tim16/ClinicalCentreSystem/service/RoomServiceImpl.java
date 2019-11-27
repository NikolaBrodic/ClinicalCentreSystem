package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.RoomDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomPagingDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.Room;
import ftn.tim16.ClinicalCentreSystem.repository.RoomRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.LongToIntFunction;

@Service
public class RoomServiceImpl implements RoomService{

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ExaminationService examinationService;

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
    public RoomPagingDTO findAllRoomsInClinic(String kind,Clinic clinic, Pageable page,String search,String date,String searchStartTime,String searchEndTime) throws DateTimeParseException{
        ExaminationKind examinationKind = getKind(kind);
        if(examinationKind == null){
            return null;
        }
        boolean searchActive = true;
        if(search == null || search.isEmpty()){
            searchActive = false;
        }
        boolean dateSearchActive = true;
        if(date.equals("undefined") || searchStartTime.equals("undefined")  || searchEndTime.equals("undefined") ){
            dateSearchActive=false;
        }
        if(!searchActive && !dateSearchActive){
            RoomPagingDTO roomPagingDTO = new RoomPagingDTO( convertToDTO(
                    roomRepository.findByClinicIdAndStatusAndKind(clinic.getId(),LogicalStatus.EXISTING,examinationKind,page).getContent()),
                    findAllRoomsInClinic(clinic).size());
            return roomPagingDTO;
        }

        List<Room> roomsInClinicAll = roomRepository.findByLabelContainsIgnoringCaseAndClinicIdAndStatusAndKind
                (search,clinic.getId(),LogicalStatus.EXISTING,examinationKind);

        if(!dateSearchActive){
            Page<Room> roomsInClinicPage = roomRepository.findByLabelContainsIgnoringCaseAndClinicIdAndStatusAndKind
                    (search,clinic.getId(),LogicalStatus.EXISTING,examinationKind,page);
            return new RoomPagingDTO(convertToDTO(roomsInClinicPage.getContent()), roomsInClinicAll.size());
        }
        LocalDate localDate =getDate(date);
        LocalDateTime startDateTime = getLocalDateTime(localDate,searchStartTime);
        LocalDateTime endDateTime = getLocalDateTime(localDate,searchEndTime);
        boolean available = true;
        List<Room> availableRoom = new ArrayList<>();
        for (Room currentRoom: roomsInClinicAll) {
            List<Examination> examinations = examinationService.getExaminations(currentRoom.getId());
            if(!examinations.isEmpty()){
                for(Examination examination : examinations){
                    if(!examination.getInterval().isAvailable(startDateTime,endDateTime)){
                        available = false;
                        break;
                    }
                }
            }
            if(available){
                availableRoom.add(currentRoom);
            }
            available = true;
        }
        int start = (int) page.getOffset();
        int end = (start + page.getPageSize()) > availableRoom.size() ? availableRoom.size() : (start + page.getPageSize());
        Page<Room> pages = new PageImpl<Room>(availableRoom.subList(start, end), page, availableRoom.size());
        RoomPagingDTO roomPagingDTO = new
                RoomPagingDTO(convertToDTO(pages.getContent()), roomsInClinicAll.size());

        return roomPagingDTO;
    }

    private LocalDateTime getLocalDateTime(LocalDate date,String time) throws DateTimeParseException{
        LocalTime localTime = LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm"));
        return  LocalDateTime.of(date,localTime);
    }

    private LocalDate getDate(String date) throws DateTimeParseException{
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return LocalDate.parse(date, formatter);
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


}
