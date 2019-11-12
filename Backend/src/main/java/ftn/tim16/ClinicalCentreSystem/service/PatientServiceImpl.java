package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.AwaitingApprovalPatientDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
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

    @Override
    public List<AwaitingApprovalPatientDTO> findByStatus(PatientStatus patientStatus) {
        List<Patient> patients = patientRepository.findByStatus(patientStatus);
        List<AwaitingApprovalPatientDTO> patientsDTO = new ArrayList<AwaitingApprovalPatientDTO>();
        for (Patient patient : patients) {
            patientsDTO.add(convertToDTO(patient));
        }

        return patientsDTO;
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
