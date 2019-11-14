package ftn.tim16.ClinicalCentreSystem.service;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicAdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;

@Service
public class ClinicAdministratorServiceImpl implements ClinicAdministratorService {
    @Autowired
    private ClinicAdministratorRepository clinicAdministratorRepository;

    @Override
    public List<ClinicAdministrator> getClinicAdministrators() {
        return clinicAdministratorRepository.findAll();
    }


    @Override
    public ClinicAdministrator changePassword(UserDTO userDTO, ClinicAdministrator user) {
        user.setPassword(userDTO.getNewPassword());
        if(user.getStatus().equals(UserStatus.NEVER_LOGGED_IN)){
            user.setStatus(UserStatus.ACTIVE);
        }
        return clinicAdministratorRepository.save(user);
    }
}
