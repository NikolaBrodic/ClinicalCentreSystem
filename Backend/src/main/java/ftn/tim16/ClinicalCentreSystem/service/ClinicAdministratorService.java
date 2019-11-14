package ftn.tim16.ClinicalCentreSystem.service;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;

import java.util.List;

public interface ClinicAdministratorService {
    List<ClinicAdministrator> getClinicAdministrators();
    ClinicAdministrator changePassword(UserDTO userDTO, ClinicAdministrator user);
}
