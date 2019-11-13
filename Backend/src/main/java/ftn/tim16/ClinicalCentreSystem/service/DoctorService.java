package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;

public interface DoctorService {
    Doctor changePassword(UserDTO userDTO, Doctor user);
}
