package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.NurseDTO;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;

import java.util.List;

public interface NurseService {
    Nurse changePassword(String newPassword, Nurse user);

    List<NurseDTO> getAllNursesInClinic(Long id);
}
