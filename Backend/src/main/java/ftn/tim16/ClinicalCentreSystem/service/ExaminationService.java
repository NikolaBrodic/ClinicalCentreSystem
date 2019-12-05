package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationPagingDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ExaminationService {

    public List<Examination> getExaminations(Long idRoom);
    public List<Examination> getDoctorsExamination(Long idDoctor);
    public List<Examination> getNursesExamination(Long idNurse);
    public List<Examination> getExaminationsForPatient(Long idPatient);

    public Examination getExamination(Long id);
    public ExaminationPagingDTO getAwaitingExaminations(String kind, ClinicAdministrator clinicAdministrator, Pageable page);
    public List<Examination> getAwaitingExaminations();
    public Examination assignRoom(Examination examination, Room room, Nurse chosenNurse);

    public ExaminationPagingDTO getDoctorsExaminations(Doctor doctor, Pageable page);

    public Examination cancelExamination(Doctor doctor, Long examinationId);
}
