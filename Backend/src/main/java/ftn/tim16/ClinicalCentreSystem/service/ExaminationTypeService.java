package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;

public interface ExaminationTypeService {
    ExaminationType create(ExaminationType examinationType, ClinicAdministrator clinicAdministrator);

}
