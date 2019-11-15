package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.Patient;

import java.util.List;

public interface PatientService {
    Patient changePassword(UserDTO userDTO, Patient user);

    List<AwaitingApprovalPatientDTO> findByStatus(PatientStatus patientStatus);

    Patient approveRequestToRegister(Long id);

    boolean rejectRequestToRegister(Long id, String reason);
}
