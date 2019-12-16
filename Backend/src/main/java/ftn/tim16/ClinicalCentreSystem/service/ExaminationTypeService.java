package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.CreateExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;

import java.util.List;

public interface ExaminationTypeService {
    ExaminationType create(CreateExaminationTypeDTO examinationType, Clinic clinic);

    ExaminationType edit(ExaminationTypeDTO examinationType, Long clinicId);

    ExaminationType editPriceList(ExaminationTypeDTO examinationType, Long clinicId);

    List<ExaminationTypeDTO> findAllTypesInClinic(Long clinicId);

    List<ExaminationTypeDTO> searchTypesInClinic(Clinic clinic, String searchLabel, Double searchPrice);

    ExaminationType findById(Long id);

    ExaminationType deleteExaminationType(Long clinicId, Long id);
}
