package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.AwaitingApprovalPatientDTO;
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
        Patient patientToApprove = patientRepository.findById(id).orElseGet(null);

        if (patientToApprove == null) {
            return null;
        }

        patientToApprove.setStatus(PatientStatus.APPROVED);
        patientToApprove.setMedicalRecord(new MedicalRecord());

        String subject = "Request to register approved";
        StringBuilder sb = new StringBuilder();
        sb.append("Great news! Your request to register as a patient is approved by a clinical centre administrator.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("You can now login to the Clinical Centre System and start using it.");
        String text = sb.toString();
        emailNotificationService.sendEmail(patientToApprove.getEmail(), subject, text);

        return patientRepository.save(patientToApprove);
    }

    //TODO: Change to use some made mapper as dependency
    private AwaitingApprovalPatientDTO convertToDTO(Patient patient) {
        AwaitingApprovalPatientDTO awaitingApprovalPatientDTO = new AwaitingApprovalPatientDTO();
        awaitingApprovalPatientDTO.setFirstName(patient.getFirstName());
        awaitingApprovalPatientDTO.setLastName(patient.getLastName());
        awaitingApprovalPatientDTO.setEmail((patient.getEmail()));

        return awaitingApprovalPatientDTO;
    }
}
