package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;

import java.util.List;

public interface ExaminationTypeService {
    List<ExaminationTypeDTO> findAllTypesInClinic(Clinic clinic);
}
