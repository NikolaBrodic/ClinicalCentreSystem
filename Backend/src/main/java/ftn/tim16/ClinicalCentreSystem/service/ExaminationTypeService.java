package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;

import java.util.List;

public interface ExaminationTypeService {
    ExaminationType create(ExaminationTypeDTO examinationType, ClinicAdministrator clinicAdministrator);

    List<ExaminationTypeDTO> findAllTypesInClinic(Long clinic_id);

    List<ExaminationTypeDTO> searchTypesInClinic(Clinic clinic, String searchLabel, Double searchPrice);

    ExaminationType findById(Long id);
}
