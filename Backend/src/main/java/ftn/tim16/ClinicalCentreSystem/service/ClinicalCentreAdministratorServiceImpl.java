package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.ClinicalCentreAdministrator;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicalCentreAdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClinicalCentreAdministratorServiceImpl  implements ClinicalCentreAdministratorService{
    @Autowired
    private ClinicalCentreAdministratorRepository clinicalCentreAdministratorRepository;

    @Override
    public ClinicalCentreAdministrator changePassword(UserDTO userDTO, ClinicalCentreAdministrator user) {
        user.setPassword(userDTO.getNewPassword());
        if(user.getStatus().equals(UserStatus.NEVER_LOGGED_IN)){
            user.setStatus(UserStatus.ACTIVE);
        }
        return clinicalCentreAdministratorRepository.save(user);
    }
}
