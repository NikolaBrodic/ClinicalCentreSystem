package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PatientStatus;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl  implements PatientService{
    @Autowired
    private PatientRepository patientRepository;

    public Patient changePassword(UserDTO userDTO, Patient user) {
        if(user.getStatus().equals(PatientStatus.AWAITING_APPROVAL)){
            return null;
        }
        user.setPassword(userDTO.getNewPassword());
        return patientRepository.save(user);
    }
}
