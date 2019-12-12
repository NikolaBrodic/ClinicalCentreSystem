package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.AssignExaminationDTO;
import ftn.tim16.ClinicalCentreSystem.dto.CreateRoomDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomDTO;
import ftn.tim16.ClinicalCentreSystem.dto.RoomPagingDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.RoomRepository;
import ftn.tim16.ClinicalCentreSystem.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

@Transactional
@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;


    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private NurseService nurseService;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @Autowired
    private DateTimeIntervalService dateTimeIntervalService;

    @Override
    public Room findById(Long id) {
        return roomRepository.getByIdAndStatusNot(id, LogicalStatus.DELETED);
    }

    @Override
    public Room create(CreateRoomDTO roomDTO, ClinicAdministrator clinicAdministrator) {
        if (roomRepository.findByLabelIgnoringCase(roomDTO.getLabel()) != null) {
            return null;
        }
        ExaminationKind examinationKind = getKind(roomDTO.getKind());
        if (examinationKind == null) {
            return null;
        }
        Room room = new Room(roomDTO.getLabel(), examinationKind, clinicAdministrator.getClinic());
        return roomRepository.save(room);
    }


    @Override
    public List<RoomDTO> findAllRoomsInClinic(Clinic clinic) {
        return convertToDTO(roomRepository.findByClinicIdAndStatus(clinic.getId(), LogicalStatus.EXISTING));
    }

    @Override
    public RoomPagingDTO findAllRoomsInClinic(String kind, Clinic clinic, Pageable page, String search,
                                              String date, String searchStartTime, String searchEndTime) throws DateTimeParseException {
        ExaminationKind examinationKind = getKind(kind);
        if (examinationKind == null) {
            RoomPagingDTO roomPagingDTO = new RoomPagingDTO(convertToDTO(
                    roomRepository.findByLabelContainsIgnoringCaseAndClinicIdAndStatus(search, clinic.getId(), LogicalStatus.EXISTING, page).getContent()),
                    roomRepository.findByLabelContainsIgnoringCaseAndClinicIdAndStatus(search, clinic.getId(), LogicalStatus.EXISTING).size());
            return roomPagingDTO;
        }

        boolean dateSearchActive = true;
        if (date.isEmpty() || searchStartTime.isEmpty() || searchEndTime.isEmpty()) {
            dateSearchActive = false;
        }
        if ((search == null || search.isEmpty()) && !dateSearchActive) {
            RoomPagingDTO roomPagingDTO = new RoomPagingDTO(convertToDTO(
                    roomRepository.findByClinicIdAndStatusAndKind(clinic.getId(), LogicalStatus.EXISTING, examinationKind, page).getContent()),
                    findAllRoomsInClinic(clinic).size());
            return roomPagingDTO;
        }

        List<Room> roomsInClinicAll = roomRepository.findByLabelContainsIgnoringCaseAndClinicIdAndStatusAndKind
                (search, clinic.getId(), LogicalStatus.EXISTING, examinationKind);

        if (!dateSearchActive) {
            Page<Room> roomsInClinicPage = roomRepository.findByLabelContainsIgnoringCaseAndClinicIdAndStatusAndKind
                    (search, clinic.getId(), LogicalStatus.EXISTING, examinationKind, page);
            return new RoomPagingDTO(convertToDTO(roomsInClinicPage.getContent()), roomsInClinicAll.size());
        }

        LocalDate localDate = getDate(date);
        LocalDateTime startDateTime = getLocalDateTime(localDate, searchStartTime);
        LocalDateTime endDateTime = getLocalDateTime(localDate, searchEndTime);

        List<RoomDTO> availableRoom = searchByDateAndTime(roomsInClinicAll, startDateTime, endDateTime);
        if (availableRoom.isEmpty()) {
            availableRoom = getRoomOnAnotherDate(roomsInClinicAll, startDateTime, endDateTime);
        }
        int start = (int) page.getOffset();
        int end = (start + page.getPageSize()) > availableRoom.size() ? availableRoom.size() : (start + page.getPageSize());
        Page<RoomDTO> pages = new PageImpl<RoomDTO>(availableRoom.subList(start, end), page, availableRoom.size());
        return new RoomPagingDTO(pages.getContent(), roomsInClinicAll.size());
    }

    @Override
    public List<RoomDTO> getAvailableExaminationRooms(Long clinicId, String startDateTime, String endDateTime) {
        List<Room> rooms = roomRepository.findByClinicIdAndStatusAndKind(clinicId, LogicalStatus.EXISTING, ExaminationKind.EXAMINATION);
        return searchByDateAndTime(rooms, getLocalDateTime(startDateTime), getLocalDateTime(endDateTime));
    }

    @Override
    public Room deleteRoom(Long clinic_id, Long room_id) {
        Room room = roomRepository.getByIdAndStatusNot(room_id, LogicalStatus.DELETED);

        if (room == null) {
            return null;
        }

        if (room.getClinic().getId() != clinic_id) {
            return null;
        }

        List<Examination> upcomingExaminations = examinationService.getUpcomingExaminationsInRoom(room_id);

        if (upcomingExaminations != null && !upcomingExaminations.isEmpty()) {
            return null;
        }

        room.setStatus(LogicalStatus.DELETED);
        return roomRepository.save(room);
    }

    private List<RoomDTO> searchByDateAndTime(List<Room> roomsInClinicAll, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<RoomDTO> availableRoom = new ArrayList<>();
        for (Room currentRoom : roomsInClinicAll) {
            if (isAvailable(currentRoom, startDateTime, endDateTime)) {
                RoomDTO roomDTO = new RoomDTO(currentRoom);
                roomDTO.setAvailable(startDateTime);
                availableRoom.add(roomDTO);
            }
        }
        return availableRoom;
    }


    private List<RoomDTO> getRoomOnAnotherDate(List<Room> roomsInClinicAll, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<RoomDTO> available = new ArrayList<>();
        long duration = Duration.between(startDateTime, endDateTime).toMillis() / 1000;
        for (Room currentRoom : roomsInClinicAll) {
            List<Examination> examinations = examinationService.getExaminations(currentRoom.getId());
            for (Examination examination : examinations) {
                LocalDateTime newEndExamination = examination.getInterval().getEndDateTime().plusSeconds(duration);
                if (isAvailable(currentRoom, examination.getInterval().getEndDateTime(), newEndExamination)) {
                    RoomDTO roomDTO = new RoomDTO(currentRoom);
                    roomDTO.setAvailable(examination.getInterval().getEndDateTime());
                    available.add(roomDTO);
                    break;
                }
            }
        }
        available.sort(new Comparator<RoomDTO>() {
            @Override
            public int compare(RoomDTO room1, RoomDTO room2) {
                return room1.getAvailable().isAfter(room2.getAvailable()) ? 1 : -1;
            }
        });

        return available;
    }

    private LocalDateTime getLocalDateTime(LocalDate date, String time) throws DateTimeParseException {
        LocalTime localTime = LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm"));
        return LocalDateTime.of(date, localTime);
    }

    private LocalDate getDate(String date) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date, formatter);
    }

    private LocalDateTime getLocalDateTime(String date) throws DateTimeParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return LocalDateTime.parse(date, formatter);
    }

    private ExaminationKind getKind(String kind) {
        try {
            return ExaminationKind.valueOf(kind.toUpperCase());
        } catch (Exception e) {
            return null;
        }
    }

    private List<RoomDTO> convertToDTO(List<Room> rooms) {
        if (rooms == null || rooms.isEmpty()) {
            return new ArrayList<>();
        }
        List<RoomDTO> roomDTOS = new ArrayList<>();
        for (Room room : rooms) {
            roomDTOS.add(new RoomDTO(room));
        }
        return roomDTOS;
    }

    @Override
    public Room assignRoom(AssignExaminationDTO examination, ClinicAdministrator clinicAdministrator) {
        Examination selectedExamination = examinationService.getExamination(examination.getId());

        if (selectedExamination.getClinicAdministrator().getId() != clinicAdministrator.getId()) {
            return null;
        }
        RoomDTO roomDTO = new RoomDTO(examination.getRoomId(), examination.getLabel(), examination.getKind(), getLocalDateTime(examination.getAvailable()));
        return assignRoom(selectedExamination.getId(), roomDTO);
    }


    private Room assignRoom(Long examinationId, RoomDTO roomDTO) {
        Examination selectedExamination = examinationService.getExamination(examinationId);
        Room room = findById(roomDTO.getId());
        if (selectedExamination == null || room == null || room.getKind() != selectedExamination.getKind()) {
            return null;
        }
        long duration = Duration.between(selectedExamination.getInterval().getStartDateTime(), selectedExamination.getInterval().getEndDateTime()).toMillis() / 1000;
        if (!isAvailable(room, roomDTO.getAvailable(), roomDTO.getAvailable().plusSeconds(duration))) {
            return null;
        }
        Doctor doctor = null;
        for (Doctor doc : selectedExamination.getDoctors()) {
            doctor = doc;
            break;
        }
        if (doctor == null) {
            return null;
        }
        Nurse chosenNurse = null;
        if (roomDTO.getAvailable().equals(selectedExamination.getInterval().getStartDateTime())) {
            chosenNurse = nurseService.getRandomNurse(selectedExamination.getClinic().getId(), selectedExamination.getInterval().getStartDateTime()
                    , selectedExamination.getInterval().getEndDateTime());
            examinationService.assignRoom(selectedExamination, room, chosenNurse);
        } else {
            DateTimeInterval dateTimeInterval = dateTimeIntervalService.create(roomDTO.getAvailable(),
                    roomDTO.getAvailable().plusSeconds(duration));
            if (dateTimeInterval != null) {
                chosenNurse = nurseService.getRandomNurse(selectedExamination.getClinic().getId(), dateTimeInterval.getStartDateTime(),
                        dateTimeInterval.getEndDateTime());
                //treba da proverim da li je doktor tad slobodan, ako nije mora da ga izabere! Pazi da doktor mora da bude slobodan i specijalizovan
                if (!doctorService.isAvailable(doctor, dateTimeInterval.getStartDateTime(), dateTimeInterval.getEndDateTime())) {
                    doctorService.removeExamination(selectedExamination, doctor.getEmail());
                    selectedExamination.getDoctors().remove(doctor);
                    doctor = doctorService.getAvailableDoctor(selectedExamination.getExaminationType(), dateTimeInterval.getStartDateTime(),
                            dateTimeInterval.getEndDateTime(), selectedExamination.getClinic().getId());
                    if (doctor == null) {
                        return null;
                    }
                    selectedExamination.getDoctors().add(doctor);

                }
                selectedExamination.setInterval(dateTimeInterval);
                examinationService.assignRoom(selectedExamination, room, chosenNurse);
            }

        }

        sendMail(selectedExamination, doctor, selectedExamination.getPatient(), chosenNurse);
        return findById(roomDTO.getId());
    }

    private void sendMail(Examination examination, Doctor doctor, Patient patient, Nurse nurse) {

        if (doctor == null || patient == null || nurse == null) {
            return;
        }
        String subject = "Notice: Examination room for the examination has been assigned";
        StringBuilder sb = new StringBuilder();
        sb.append("Examination room for the examination has been assigned.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("Examination will be held on ");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy.");
        sb.append(examination.getInterval().getStartDateTime().format(dateFormatter));
        sb.append(" between ");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm");
        sb.append(examination.getInterval().getStartDateTime().format(timeFormatter));
        sb.append(" and ");
        sb.append(examination.getInterval().getEndDateTime().format(timeFormatter));
        String text = sb.toString();
        emailNotificationService.sendEmail(doctor.getEmail(), subject, text);
        sb.append(". The examination will be held by the doctor ");
        sb.append(doctor.getFirstName());
        sb.append(" ");
        sb.append(doctor.getLastName());
        String textWithDoctor = sb.toString();
        emailNotificationService.sendEmail(patient.getEmail(), subject, textWithDoctor);
        emailNotificationService.sendEmail(nurse.getEmail(), subject, textWithDoctor);
    }

    private boolean isAvailable(Room currentRoom, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<Examination> examinations = examinationService.getExaminations(currentRoom.getId());
        if (!examinations.isEmpty()) {
            for (Examination examination : examinations) {
                if (!examination.getInterval().isAvailable(startDateTime, endDateTime)) {
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public void automaticallyAssignRoom() {
        List<Examination> examinations = examinationService.getAwaitingExaminations();
        for (Examination examination : examinations) {
            List<Room> allRooms = roomRepository.findByClinicIdAndStatusAndKind(examination.getClinic().getId(), LogicalStatus.EXISTING, examination.getKind());
            List<RoomDTO> availableRoom = searchByDateAndTime(allRooms, examination.getInterval().getStartDateTime(), examination.getInterval().getEndDateTime());
            if (availableRoom.isEmpty()) {
                availableRoom = getRoomOnAnotherDate(allRooms, examination.getInterval().getStartDateTime(), examination.getInterval().getEndDateTime());
            }
            assignRoom(examination.getId(), availableRoom.get(new Random().nextInt(availableRoom.size())));
        }
    }
}
