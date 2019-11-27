package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationPagingDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExaminationServiceImpl implements ExaminationService{

    @Autowired
    private ExaminationRepository examinationRepository;


    @Override
    public List<Examination> getExaminations(Long idRoom) {
        return examinationRepository.findByRoomId(idRoom);
    }

    //AWAITING i ako je admin id bas taj koji je i ulogovan
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

    private ExaminationKind getKind(String kind){
        try {
            return ExaminationKind.valueOf(kind.toUpperCase());
        }catch (Exception e){
            return null;
        }
    }
}
