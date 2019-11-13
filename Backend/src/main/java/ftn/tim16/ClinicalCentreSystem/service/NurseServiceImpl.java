package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import ftn.tim16.ClinicalCentreSystem.repository.NurseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NurseServiceImpl implements NurseService{
    @Autowired
    private NurseRepository nurseRepository;

    public Nurse changePassword(UserDTO userDTO, Nurse user) {
        user.setPassword(userDTO.getNewPassword());
        if(user.getStatus().equals(UserStatus.NEVER_LOGGED_IN)){
            user.setStatus(UserStatus.ACTIVE);
        }
        return nurseRepository.save(user);
    }
}
