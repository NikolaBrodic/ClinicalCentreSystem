package ftn.tim16.ClinicalCentreSystem.controller;

import ftn.tim16.ClinicalCentreSystem.dto.AssignExaminationDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomPagingDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.Room;
import ftn.tim16.ClinicalCentreSystem.service.ClinicAdministratorService;
import ftn.tim16.ClinicalCentreSystem.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private ClinicAdministratorService clinicAdministratorService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<Room> create(@Valid  @RequestBody RoomDTO roomDTO) {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();

        if(clinicAdministrator == null){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Room createdRoom = roomService.create(roomDTO,clinicAdministrator);
        if(createdRoom == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Room>(createdRoom, HttpStatus.CREATED);
    }


    @GetMapping(value="/all")
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<List<RoomDTO>> getAllRoomsForAdmin() {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();
        if(clinicAdministrator == null){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(roomService.findAllRoomsInClinic(clinicAdministrator.getClinic()), HttpStatus.OK);
    }

    @GetMapping(value="/pageAll")
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<RoomPagingDTO> getAllRoomsForAdmin(@RequestParam(value = "kind", required = true) String kind,
                                                             @RequestParam(value = "searchLabel") String searchLabel,
                                                             @RequestParam(value = "searchDate") String searchDate,
                                                             @RequestParam(value = "searchStartTime") String searchStartTime,
                                                             @RequestParam(value = "searchEndTime") String searchEndTime,
                                                             Pageable page) {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();
        if(clinicAdministrator == null){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        try {
            RoomPagingDTO roomPagingDTO = roomService.
                    findAllRoomsInClinic(kind,clinicAdministrator.getClinic(),page,searchLabel,searchDate,searchStartTime,searchEndTime);
            return new ResponseEntity<>(roomPagingDTO, HttpStatus.OK);
        }catch (DateTimeParseException ex){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<Room> assignRoom(@Valid  @RequestBody AssignExaminationDTO examination) {
        ClinicAdministrator clinicAdministrator = clinicAdministratorService.getLoginAdmin();

        if(clinicAdministrator == null){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Room assignedRoom = roomService.assignRoom(examination,clinicAdministrator);
        if(assignedRoom == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Room>(assignedRoom, HttpStatus.OK);
    }

    @Scheduled(cron="${room.cron}")
    public void assignRoom(){
         roomService.automaticallyAssignRoom();
    }

}
