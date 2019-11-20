package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ClinicAdministratorDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;

import java.util.List;

public interface ClinicAdministratorService {
    //List<ClinicAdministrator> getClinicAdministrators();

    ClinicAdministrator changePassword(String newPassword, ClinicAdministrator user);

    ClinicAdministrator getLoginAdmin();

    List<ClinicAdministratorDTO> getAllClinicAdministratorInClinic(Long id);

}
