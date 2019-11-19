package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.Examination;

import java.time.LocalDate;
import java.util.List;

public interface ExaminationService {

    public List<Examination> getExaminations(Long idRoom);
}
