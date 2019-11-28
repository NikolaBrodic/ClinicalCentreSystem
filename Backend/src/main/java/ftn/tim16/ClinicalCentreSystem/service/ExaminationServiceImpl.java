package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationPagingDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExaminationServiceImpl implements ExaminationService{

    @Autowired
    private ExaminationRepository examinationRepository;


    @Override
    public List<Examination> getExaminations(Long idRoom) {
        return examinationRepository.findByRoomIdOrderByIntervalStartDateTime(idRoom);
    }

    @Override
    public List<Examination> getDoctorsExamination(Long idDoctor) {
        return examinationRepository.findByDoctorsId(idDoctor);
    }

    @Override
    public List<Examination> getNursesExamination(Long idNurse) {
        return examinationRepository.findByNurseId(idNurse);
    }

    @Override
    public Examination getExamination(Long id) {
        try{
           return  examinationRepository.getById(id);
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
        List<Examination>  examinations= examinationRepository.findByDoctorsId(doctor.getId());

        ExaminationPagingDTO examinationPagingDTO = new ExaminationPagingDTO(examinationRepository.findByDoctorsId
                (doctor.getId(),page).getContent(),examinations.size());
        return examinationPagingDTO;
    }

    private ExaminationKind getKind(String kind){
        try {
            return ExaminationKind.valueOf(kind.toUpperCase());
        }catch (Exception e){
            return null;
        }
    }
}
