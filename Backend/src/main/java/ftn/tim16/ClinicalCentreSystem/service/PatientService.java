package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.request.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.PatientWithIdDTO;
import ftn.tim16.ClinicalCentreSystem.dto.response.PatientPagingDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PatientService {
    Patient changePassword(String newPassword, Patient user);

    List<AwaitingApprovalPatientDTO> findByStatus(PatientStatus patientStatus);

    PatientWithIdDTO approveRequestToRegister(Long id);

    boolean rejectRequestToRegister(Long id, String reason);

    PatientPagingDTO getPatientsForMedicalStaffPaging(Long clinicId, String firstName, String lastName, String healthInsuranceId, Pageable page);

    Patient getLoginPatient();

    PatientWithIdDTO getPatientForMedicalStaff(Long id);

}
