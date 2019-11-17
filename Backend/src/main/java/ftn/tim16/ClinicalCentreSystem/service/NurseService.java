package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;

public interface NurseService {
    Nurse changePassword(String newPassword, Nurse user);
}
