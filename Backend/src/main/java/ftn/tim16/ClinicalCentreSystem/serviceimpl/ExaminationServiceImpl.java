package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationDTO;
import ftn.tim16.ClinicalCentreSystem.dto.ExaminationPagingDTO;
import ftn.tim16.ClinicalCentreSystem.dto.PredefinedExaminationDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationRepository;
import ftn.tim16.ClinicalCentreSystem.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Transactional
@Service
public class ExaminationServiceImpl implements ExaminationService {

    @Autowired
    private ExaminationRepository examinationRepository;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @Autowired
    private ExaminationTypeService examinationTypeService;

    @Autowired
    private NurseService nurseService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private PatientService patientService;

    @Override
    public List<Examination> getExaminations(Long idRoom) {
        return examinationRepository.findByRoomIdAndStatusNotOrderByIntervalStartDateTime(idRoom, ExaminationStatus.CANCELED);
    }

    @Override
    public List<Examination> getDoctorExaminations(Long idDoctor) {
        return examinationRepository.findByDoctorsIdAndStatusNot(idDoctor, ExaminationStatus.CANCELED);
    }

    @Override
    public List<Examination> getNurseExaminations(Long idNurse) {
        return examinationRepository.findByNurseIdAndStatusNot(idNurse, ExaminationStatus.CANCELED);
    }

    @Override
    public List<Examination> getExaminationsForPatient(Long idPatient) {
        return examinationRepository.findByPatientIdAndStatusNot(idPatient, ExaminationStatus.CANCELED);
    }

    /**
     *
     * preuzimamo samo predefinisane slobodne
     * @return
     */
    @Override
    public List<Examination> getAvailablePredefinedExaminations() {
        return examinationRepository.findByStatus(ExaminationStatus.PREDEF_AVAILABLE);
    }

    @Override
    public Examination reservePredefinedAppointment(Long examinationId) {
        Patient p = patientService.getLoginPatient();
        Examination e= examinationRepository.findOneById(examinationId);
        e.setPatient(p);
        e.setStatus(ExaminationStatus.PREDEF_BOOKED);
        return examinationRepository.save(e);

    }

    @Override
    public Examination getExamination(Long id) {
        try {
            return examinationRepository.getByIdAndStatusNot(id, ExaminationStatus.CANCELED);
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public ExaminationPagingDTO getAwaitingExaminations(String kind, ClinicAdministrator clinicAdministrator, Pageable page) {
        ExaminationKind examinationKind = getKind(kind);
        if (kind == null) {
            return null;
        }
        List<Examination> examinations = examinationRepository.findByClinicAdministratorIdAndStatusAndKind
                (clinicAdministrator.getId(), ExaminationStatus.AWAITING, examinationKind);

        ExaminationPagingDTO examinationPagingDTO = new ExaminationPagingDTO(examinationRepository.findByClinicAdministratorIdAndStatusAndKind
                (clinicAdministrator.getId(), ExaminationStatus.AWAITING, examinationKind, page).getContent(), examinations.size());
        return examinationPagingDTO;
    }

    @Override
    public List<Examination> getAwaitingExaminations() {
        return examinationRepository.findByStatus(ExaminationStatus.AWAITING);
    }

    @Override
    public ExaminationPagingDTO getPredefinedExaminations(ClinicAdministrator clinicAdministrator, Pageable page) {
        List<Examination> examinations = examinationRepository.findByClinicAdministratorIdAndStatusOrClinicAdministratorIdAndStatus
                (clinicAdministrator.getId(), ExaminationStatus.PREDEF_AVAILABLE, clinicAdministrator.getId(), ExaminationStatus.PREDEF_BOOKED);
        Page<Examination> pageExaminations = examinationRepository.findByClinicAdministratorIdAndStatusOrClinicAdministratorIdAndStatus
                (clinicAdministrator.getId(), ExaminationStatus.PREDEF_AVAILABLE, clinicAdministrator.getId(), ExaminationStatus.PREDEF_BOOKED, page);
        ExaminationPagingDTO examinationPagingDTO = new ExaminationPagingDTO(pageExaminations.getContent(), examinations.size());
        return examinationPagingDTO;
    }

    @Override
    public ExaminationPagingDTO getPredefinedExaminationsForPatient(Patient patient, Pageable page) {
        List<Examination> examinations = examinationRepository.findByPatientIdAndStatus(
                patient.getId(),
                PatientStatus.APPROVED
        );
        Page<Examination> pageExaminations = examinationRepository.findByPatientIdAndStatus(
                patient.getId(),
                PatientStatus.APPROVED,
                page
        );
        return new ExaminationPagingDTO(pageExaminations.getContent(), examinations.size());
    }

    @Override
    public Examination assignRoom(Examination selectedExamination, Room room, Nurse chosenNurse) {
        selectedExamination.setRoom(room);
        selectedExamination.setStatus(ExaminationStatus.APPROVED);
        if (chosenNurse != null) {
            selectedExamination.setNurse(chosenNurse);
        }
        return examinationRepository.save(selectedExamination);
    }

    @Override
    public ExaminationPagingDTO getDoctorExaminations(Doctor doctor, Pageable page) {
        //Doctor can cancel examination just 24 hours before.
        List<Examination> examinations = examinationRepository.findByDoctorsIdAndStatusNotAndIntervalStartDateTimeAfter
                (doctor.getId(), ExaminationStatus.CANCELED, LocalDateTime.now());

        ExaminationPagingDTO examinationPagingDTO = new ExaminationPagingDTO(examinationRepository.findByDoctorsIdAndStatusNotAndIntervalStartDateTimeAfter
                (doctor.getId(), ExaminationStatus.CANCELED, LocalDateTime.now(), page).getContent(), examinations.size());
        return examinationPagingDTO;
    }

    @Override
    public Examination cancelExamination(Doctor doctor, Long examinationId) {
        Examination examination = getExamination(examinationId);
        if (examination == null) {
            return null;
        }
        for (Doctor doc : examination.getDoctors()) {
            if (doc.getId() != doctor.getId()) {
                return null;
            }
            break;
        }
        //Doctor can cancel scheduled examination/operation only 24 hours before it is going to be held.
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime examinationCanCancel = examination.getInterval().getStartDateTime().minusHours(24);
        if (currentTime.isAfter(examinationCanCancel)) {
            return null;
        }
        examination.setStatus(ExaminationStatus.CANCELED);
        examination.getDoctors().remove(doctor);
        Nurse nurse = examination.getNurse();
        examination.setNurse(null);

        sendMail(examination, doctor, nurse, examination.getPatient());
        return examinationRepository.save(examination);
    }

    @Override
    public Examination cancelExaminationAsPatient(Patient patient, Long examinationId) {
        Examination examination = getExamination(examinationId);

        if (examination == null) {
            return null;
        }
        if(examination.getPatient().getId() != patient.getId()){
            return null;
        }
        //Patient can cancel scheduled examination/operation only 24 hours before it is going to be held.
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime examinationCanCancel = examination.getInterval().getStartDateTime().minusHours(24);
        if (currentTime.isAfter(examinationCanCancel)) {
            return null;
        }


        //sendMailPatientCancel(examination, patient);
        examination.setStatus(ExaminationStatus.CANCELED);
        examination.setPatient(null);
        Nurse nurse = examination.getNurse();
        examination.setNurse(null);
        return examinationRepository.save(examination);
    }

    @Override
    public List<Examination> getDoctorsExamination(Long idDoctor) {
        return null;
    }

    @Override
    public List<Examination> getNursesExamination(Long idNurse) {
        return null;
    }

    @Override
    public Examination createPredefinedExamination(PredefinedExaminationDTO predefinedExaminationDTO, ClinicAdministrator clinicAdministrator) {
        LocalDate localDate = getDate(predefinedExaminationDTO.getStartDateTime());
        LocalDateTime startDateTime = getLocalDateTime(localDate, predefinedExaminationDTO.getStartDateTime());
        LocalDateTime endDateTime = getLocalDateTime(localDate, predefinedExaminationDTO.getEndDateTime());

        if (startDateTime.isBefore(LocalDateTime.now()) || startDateTime.isAfter(endDateTime)) {
            return null;
        }

        ExaminationType examinationType = examinationTypeService.findById(predefinedExaminationDTO.getExaminationTypeDTO().getId());
        Doctor doctor = doctorService.getDoctor(predefinedExaminationDTO.getDoctorDTO().getId());
        Room room = roomService.findById(predefinedExaminationDTO.getRoom());

        if (examinationType == null || doctor == null || room == null) {
            return null;
        }

        Nurse nurse = nurseService.getRandomNurse(clinicAdministrator.getClinic().getId(), startDateTime, endDateTime);

        if (nurse == null) {
            return null;
        }

        DateTimeInterval dateTimeInterval = new DateTimeInterval(startDateTime, endDateTime);
        Examination examination = new Examination(ExaminationKind.EXAMINATION, dateTimeInterval, ExaminationStatus.PREDEF_AVAILABLE, examinationType,
                room, predefinedExaminationDTO.getDiscount(), nurse, clinicAdministrator.getClinic(), clinicAdministrator);
        examination.getDoctors().add(doctor);

        return examinationRepository.save(examination);
    }

    @Override
    public List<Examination> getDoctorsUpcomingExaminations(Long doctor_id) {
        return examinationRepository.findByDoctorsIdAndStatusNotAndIntervalEndDateTimeAfter(doctor_id, ExaminationStatus.CANCELED, LocalDateTime.now());
    }
    @Override
    public List<Examination> getPatientsUpcomingExaminations(Long patient_id) {
        return examinationRepository.findByPatientIdAndStatusNotAndIntervalEndDateTimeAfter(patient_id, ExaminationStatus.CANCELED, LocalDateTime.now());
    }

    @Override
    public List<Examination> findAll() {
        return examinationRepository.findAll();
    }

    @Override
    public List<Examination> getUpcomingExaminationsInRoom(Long room_id) {
        return examinationRepository.findByRoomIdAndStatusNotAndIntervalEndDateTimeAfter(room_id, ExaminationStatus.CANCELED, LocalDateTime.now());
    }

    private LocalDateTime getLocalDateTime(LocalDate date, String time) throws DateTimeParseException {
        LocalTime localTime = LocalTime.parse(time.substring(11), DateTimeFormatter.ofPattern("HH:mm"));
        return LocalDateTime.of(date, localTime);
    }

    private LocalDate getDate(String date) throws DateTimeParseException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date.substring(0, 10), formatter);
    }


    private void sendMail(Examination examination, Doctor doctor, Nurse nurse, Patient patient) {
        if (nurse == null || patient == null) {
            return;
        }
        String subject = "Notice: Examination has been canceled ";
        StringBuilder sb = new StringBuilder();
        sb.append(doctor.getFirstName());
        sb.append(" ");
        sb.append(doctor.getLastName());
        sb.append("has canceled the examination scheduled for ");
        sb.append(examination.getInterval().getStartDateTime().format(DateTimeFormatter.ofPattern("dd.MM.yyyy hh:mm")));
        sb.append(".");

        String text = sb.toString();
        emailNotificationService.sendEmail(nurse.getEmail(), subject, text);
        emailNotificationService.sendEmail(patient.getEmail(), subject, text);
        if (examination.getKind().equals(ExaminationKind.OPERATION)) {
            for (Doctor doc : examination.getDoctors()) {
                if (doc.getId() != doctor.getId()) {
                    emailNotificationService.sendEmail(doc.getEmail(), subject, text);
                }
            }
        }
    }
    private void sendMailPatientCancel(Examination examination,Patient p) {
        String subject = "Notice: Examination has been canceled ";
        StringBuilder sb = new StringBuilder();
        sb.append(p.getFirstName());
        sb.append(" ");
        sb.append(p.getLastName());
        sb.append("has canceled the examination scheduled for ");
        sb.append(examination.getInterval().getStartDateTime().format(DateTimeFormatter.ofPattern("dd.MM.yyyy hh:mm")));
        sb.append(".");

        String text = sb.toString();
        emailNotificationService.sendEmail(examination.getNurse().getEmail(), subject, text);
        if (examination.getKind().equals(ExaminationKind.OPERATION)) {
            for (Doctor doc : examination.getDoctors()) {
                emailNotificationService.sendEmail(doc.getEmail(), subject, text);
            }
        }

    }

    private ExaminationKind getKind(String kind) {
        try {
            return ExaminationKind.valueOf(kind.toUpperCase());
        } catch (Exception e) {
            return null;
        }
    }


}
