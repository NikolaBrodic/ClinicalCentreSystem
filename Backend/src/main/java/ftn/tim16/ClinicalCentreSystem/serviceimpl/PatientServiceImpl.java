package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.PatientPagingDTO;
import ftn.tim16.ClinicalCentreSystem.dto.PatientWithIdDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationStatus;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.MedicalRecord;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import ftn.tim16.ClinicalCentreSystem.service.EmailNotificationService;
import ftn.tim16.ClinicalCentreSystem.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    EmailNotificationService emailNotificationService;

    @Override
    public Patient changePassword(String newPassword, Patient user) {
        if (user.getStatus().equals(PatientStatus.AWAITING_APPROVAL)) {
            return null;
        }
        user.setPassword(newPassword);
        return patientRepository.save(user);
    }

    @Override
    public List<AwaitingApprovalPatientDTO> findByStatus(PatientStatus patientStatus) {
        List<Patient> patients = patientRepository.findByStatus(patientStatus);
        List<AwaitingApprovalPatientDTO> patientsDTO = new ArrayList<AwaitingApprovalPatientDTO>();
        for (Patient patient : patients) {
            patientsDTO.add(convertToDTO(patient));
        }

        return patientsDTO;
    }

    @Override
    public Patient approveRequestToRegister(Long id) {
        Patient patient = patientRepository.findById(id).orElseGet(null);

        if (patient == null) {
            return null;
        }

        patient.setStatus(PatientStatus.APPROVED);
        patient.setMedicalRecord(new MedicalRecord());

        Patient updatedPatient = patientRepository.save(patient);

        String subject = "Request to register approved";
        StringBuilder sb = new StringBuilder();
        sb.append("Great news! Your request to register as a patient is approved by a clinical centre administrator.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("You can now login to the Clinical Centre System and start using it.");
        String text = sb.toString();
        emailNotificationService.sendEmail(patient.getEmail(), subject, text);

        return updatedPatient;
    }

    @Override
    public boolean rejectRequestToRegister(Long id, String reason) {
        Patient patient = patientRepository.findById(id).orElseGet(null);

        if (patient == null) {
            return false;
        } else if (patient.getStatus() == PatientStatus.APPROVED) {
            return false;
        }

        String subject = "Request to register rejected";
        StringBuilder sb = new StringBuilder();
        sb.append("Your request to register as a patient is rejected by a clinical centre administrator.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("Explanation:");
        sb.append(System.lineSeparator());
        sb.append(reason);
        String text = sb.toString();
        emailNotificationService.sendEmail(patient.getEmail(), subject, text);

        patientRepository.deleteById(id);

        return true;
    }

    @Override
    public PatientPagingDTO getPatientsForMedicalStaffPaging(Long clinicId, String firstName, String lastName, String healthInsuranceId, Pageable page) {
        try {
            Page<Patient> patients = patientRepository.findDistinctByExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIdContainsAndExaminationsStatusOrExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIdContainsAndExaminationsStatus(
                    clinicId, PatientStatus.APPROVED, firstName, lastName, healthInsuranceId, ExaminationStatus.APPROVED, clinicId, PatientStatus.APPROVED, firstName, lastName, healthInsuranceId, ExaminationStatus.PREDEF_BOOKED, page);
            List<Patient> allPatients = patientRepository.findDistinctByExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIdContainsAndExaminationsStatusOrExaminationsClinicIdAndStatusAndFirstNameContainsIgnoringCaseAndLastNameContainsIgnoringCaseAndHealthInsuranceIdContainsAndExaminationsStatus(
                    clinicId, PatientStatus.APPROVED, firstName, lastName, healthInsuranceId, ExaminationStatus.APPROVED, clinicId, PatientStatus.APPROVED, firstName, lastName, healthInsuranceId, ExaminationStatus.PREDEF_BOOKED);
            return new PatientPagingDTO(convertToDTO(patients.getContent()), allPatients.size());
        } catch (Error e) {
            return null;
        }

    }

    @Override
    public Patient getLoginPatient() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        try {
            Patient patient = patientRepository.findByEmail(currentUser.getName());
            if (patient != null) {
                return patient;
            }
        } catch (UsernameNotFoundException ex) {

        }
        return null;
    }

    @Override
    public PatientWithIdDTO getPatientForMedicalStaff(Long id) {
        return new PatientWithIdDTO(patientRepository.findByIdAndStatus(id, PatientStatus.APPROVED));
    }

    private List<PatientWithIdDTO> convertToDTO(List<Patient> patients) {
        if (patients == null || patients.isEmpty()) {
            return new ArrayList<>();
        }
        List<PatientWithIdDTO> patientWithIdDTOS = new ArrayList<>();
        for (Patient patient : patients) {
            patientWithIdDTOS.add(new PatientWithIdDTO(patient));
        }
        return patientWithIdDTOS;
    }

    //TODO: Change to use some made mapper as dependency
    private AwaitingApprovalPatientDTO convertToDTO(Patient patient) {
        AwaitingApprovalPatientDTO awaitingApprovalPatientDTO = new AwaitingApprovalPatientDTO();
        awaitingApprovalPatientDTO.setId(patient.getId());
        awaitingApprovalPatientDTO.setFirstName(patient.getFirstName());
        awaitingApprovalPatientDTO.setLastName(patient.getLastName());
        awaitingApprovalPatientDTO.setEmail((patient.getEmail()));

        return awaitingApprovalPatientDTO;
    }
}
