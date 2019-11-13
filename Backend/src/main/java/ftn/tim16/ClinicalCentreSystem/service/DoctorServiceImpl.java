package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImpl  implements DoctorService{
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Doctor changePassword(UserDTO userDTO, Doctor user) {
        if(user.getStatus().equals(DoctorStatus.DELETED)){
            return null;
        }
        user.setPassword(userDTO.getNewPassword());
        if(user.getStatus().equals(DoctorStatus.NEVER_LOGGED_IN)){
            user.setStatus(DoctorStatus.ACTIVE);
        }
        return doctorRepository.save(user);
    }
}
