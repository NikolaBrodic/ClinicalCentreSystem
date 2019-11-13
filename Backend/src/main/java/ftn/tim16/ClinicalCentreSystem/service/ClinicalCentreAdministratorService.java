package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicalCentreAdministrator;

public interface ClinicalCentreAdministratorService {
    ClinicalCentreAdministrator changePassword(UserDTO userDTO, ClinicalCentreAdministrator user);
}
