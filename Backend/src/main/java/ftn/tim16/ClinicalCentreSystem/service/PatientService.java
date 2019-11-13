package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.model.Patient;

public interface PatientService {
    Patient changePassword(UserDTO userDTO, Patient user);
}
