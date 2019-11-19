package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.ClinicalCentreAdministrator;

public interface ClinicalCentreAdministratorService {
    ClinicalCentreAdministrator changePassword(String newPassword, ClinicalCentreAdministrator user);
}
