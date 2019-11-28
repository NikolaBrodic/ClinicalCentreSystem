package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationPagingDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
@Transactional
@Service
public class ExaminationServiceImpl implements ExaminationService{

    @Autowired
    private ExaminationRepository examinationRepository;

    @Autowired
    EmailNotificationService emailNotificationService;

    @Override
    public List<Examination> getExaminations(Long idRoom) {
        return examinationRepository.findByRoomIdAndStatusNotOrderByIntervalStartDateTime(idRoom,ExaminationStatus.CANCELED);
    }

    @Override
    public List<Examination> getDoctorsExamination(Long idDoctor) {
        return examinationRepository.findByDoctorsIdAndStatusNot(idDoctor,ExaminationStatus.CANCELED);
    }

    @Override
    public List<Examination> getNursesExamination(Long idNurse) {
        return examinationRepository.findByNurseIdAndStatusNot(idNurse,ExaminationStatus.CANCELED);
    }

    @Override
    public Examination getExamination(Long id) {
        try{
           return  examinationRepository.getByIdAndStatusNot(id,ExaminationStatus.CANCELED);
        }catch (Exception e){
            return null;
        }

    }

    @Override
    public ExaminationPagingDTO getAwaitingExaminations(String kind, ClinicAdministrator clinicAdministrator, Pageable page) {
        ExaminationKind examinationKind = getKind(kind);
        if(kind == null){
            return null;
        }
        List<Examination>  examinations= examinationRepository.findByClinicAdministratorIdAndStatusAndKind
        (clinicAdministrator.getId(),ExaminationStatus.AWAITING,examinationKind);

       ExaminationPagingDTO examinationPagingDTO = new ExaminationPagingDTO(examinationRepository.findByClinicAdministratorIdAndStatusAndKind
                (clinicAdministrator.getId(),ExaminationStatus.AWAITING,examinationKind,page).getContent(),examinations.size());
        return examinationPagingDTO;
    }

    @Override
    public List<Examination> getAwaitingExaminations() {
        return examinationRepository.findByStatus(ExaminationStatus.AWAITING);
    }

    @Override
    public Examination assignRoom(Examination selectedExamination, Room room, Nurse chosenNurse) {
        selectedExamination.setRoom(room);
        selectedExamination.setStatus(ExaminationStatus.APPROVED);
        if(chosenNurse != null){
            selectedExamination.setNurse(chosenNurse);
        }
        return examinationRepository.save(selectedExamination);
    }

    @Override
    public ExaminationPagingDTO getDoctorsExaminations(Doctor doctor, Pageable page) {
        List<Examination>  examinations= examinationRepository.findByDoctorsIdAndStatusNotAndIntervalStartDateTimeAfter
                (doctor.getId(),ExaminationStatus.CANCELED,LocalDateTime.now());

        ExaminationPagingDTO examinationPagingDTO = new ExaminationPagingDTO(examinationRepository.findByDoctorsIdAndStatusNotAndIntervalStartDateTimeAfter
                (doctor.getId(),ExaminationStatus.CANCELED, LocalDateTime.now(),page).getContent(),examinations.size());
        return examinationPagingDTO;
    }

    @Override
    public Examination cancelExamination(Doctor doctor, Long examinationId) {
        Examination examination = getExamination(examinationId);
        if(examination == null){
            return null;
        }
        for (Doctor doc: examination.getDoctors()) {
            if(doc.getId()!=doctor.getId()){
                return null;
            }
            break;
        }
        //Doctor can cancel scheduled examination/operation only 24 hours before it is going to be held.
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime examinationCanCancel = examination.getInterval().getStartDateTime().minusHours(24);
        if(currentTime.isAfter(examinationCanCancel)){
            return null;
        }
        examination.setStatus(ExaminationStatus.CANCELED);
        examination.getDoctors().remove(doctor);
        Nurse nurse = examination.getNurse();
        examination.setNurse(null);

        sendMail(examination,doctor,nurse,examination.getPatient());
        return examinationRepository.save(examination);
    }

    private void sendMail(Examination examination , Doctor doctor, Nurse nurse, Patient patient){
        if(nurse == null || patient == null){
            return;
        }
        String subject = "Canceled " +  examination.getKind().toString().toLowerCase();
        StringBuilder sb = new StringBuilder();
        sb.append("Doctor  " + doctor.getFirstName() + " " + doctor.getLastName() + "was canceling examination for ");
        sb.append(examination.getInterval().getStartDateTime().format(DateTimeFormatter.ofPattern("dd.MM.yyyy hh:mm")) + " - " +
                examination.getInterval().getEndDateTime().format( DateTimeFormatter.ofPattern(" hh:mm")));

        String text = sb.toString();
        emailNotificationService.sendEmail(nurse.getEmail(), subject, text);
        emailNotificationService.sendEmail(patient.getEmail(), subject, text);
        if(examination.getKind().equals(ExaminationKind.OPERATION)){
            for (Doctor doc: examination.getDoctors()) {
                if(doc.getId() != doctor.getId()){
                    emailNotificationService.sendEmail(doc.getEmail(), subject, text);
                }
            }
        }
    }
    private ExaminationKind getKind(String kind){
        try {
            return ExaminationKind.valueOf(kind.toUpperCase());
        }catch (Exception e){
            return null;
        }
    }
}
