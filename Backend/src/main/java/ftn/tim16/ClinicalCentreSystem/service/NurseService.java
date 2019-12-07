package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.NurseDTO;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface NurseService {
    Nurse changePassword(String newPassword, Nurse user);

    List<NurseDTO> getAllNursesInClinic(Long id);

    List<NurseDTO> getAllNursesInClinic(Long id, Pageable page);

    Nurse create(NurseDTO nurseDTO, ClinicAdministrator clinicAdministrator);

    Nurse getRandomNurse(Long clinic_id, LocalDateTime startDateTime, LocalDateTime endDateTime);

    Nurse getLoginNurse();
}
