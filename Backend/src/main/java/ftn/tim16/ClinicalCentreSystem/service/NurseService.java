package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;

import java.time.LocalDateTime;

public interface NurseService {
    Nurse changePassword(String newPassword, Nurse user);
    Nurse getRandomNurse(Long clinic_id, LocalDateTime startDateTime, LocalDateTime endDateTime);

}
