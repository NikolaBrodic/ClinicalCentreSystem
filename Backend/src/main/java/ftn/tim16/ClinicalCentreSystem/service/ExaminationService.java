package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationPagingDTO;
import ftn.tim16.ClinicalCentreSystem.dto.PredefinedExaminationDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExaminationService {

    List<Examination> getExaminations(Long idRoom);

    List<Examination> getDoctorExaminations(Long idDoctor);

    List<Examination> getNurseExaminations(Long idNurse);

    Examination getExamination(Long id);

    ExaminationPagingDTO getAwaitingExaminations(String kind, ClinicAdministrator clinicAdministrator, Pageable page);

    List<Examination> getAwaitingExaminations();

    ExaminationPagingDTO getPredefinedExaminations(ClinicAdministrator clinicAdministrator, Pageable page);
    ExaminationPagingDTO getPredefinedExaminationsForPatient(Patient patient, Pageable page);

    Examination assignRoom(Examination examination, Room room, Nurse chosenNurse);

    ExaminationPagingDTO getDoctorExaminations(Doctor doctor, Pageable page);

    Examination cancelExamination(Doctor doctor, Long examinationId);
    Examination cancelExaminationAsPatient(Patient patient,Long examinationId);
    public List<Examination> getDoctorsExamination(Long idDoctor);
    public List<Examination> getNursesExamination(Long idNurse);
    public List<Examination> getExaminationsForPatient(Long idPatient);
    public List<Examination> getAvailablePredefinedExaminations();

    Examination createPredefinedExamination(PredefinedExaminationDTO predefinedExaminationDTO, ClinicAdministrator clinicAdministrator);

    List<Examination> getDoctorsUpcomingExaminations(Long doctor_id);

    List<Examination> getUpcomingExaminationsInRoom(Long room_id);
}
