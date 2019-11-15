package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.MedicalRecord;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Patient changePassword(UserDTO userDTO, Patient user) {
        if (user.getStatus().equals(PatientStatus.AWAITING_APPROVAL)) {
            return null;
        }
        user.setPassword(userDTO.getNewPassword());
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

        String subject = "Request to register approved";
        StringBuilder sb = new StringBuilder();
        sb.append("Great news! Your request to register as a patient is approved by a clinical centre administrator.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("You can now login to the Clinical Centre System and start using it.");
        String text = sb.toString();
        emailNotificationService.sendEmail(patient.getEmail(), subject, text);

        return patientRepository.save(patient);
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
