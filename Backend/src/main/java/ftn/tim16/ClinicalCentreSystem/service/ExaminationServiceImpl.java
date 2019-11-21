package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExaminationServiceImpl implements ExaminationService{

    @Autowired
    private ExaminationRepository examinationRepository;


    @Override
    public List<Examination> getExaminations(Long idRoom) {
        return examinationRepository.findByRoomId(idRoom);
    }

    @Override
    public Examination getExamination(Long intervalId) {
        return examinationRepository.findByIntervalId(intervalId);
    }
}
