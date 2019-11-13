package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ClinicAdministratorService clinicAdministratorService;

    @Autowired
    private ClinicalCentreAdministratorService clinicalCentreAdministratorService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private NurseService nurseService;

    @Override
    public Object changePassword(UserDTO userDTO, Object user) {
        if (user instanceof ClinicAdministrator){
            return clinicAdministratorService.changePassword(userDTO, (ClinicAdministrator) user);
        }else if (user instanceof ClinicalCentreAdministrator){
            return clinicalCentreAdministratorService.changePassword(userDTO, (ClinicalCentreAdministrator) user);
        }else if(user instanceof Doctor){
            return doctorService.changePassword(userDTO, (Doctor) user);
        }else if(user instanceof Patient){
            return patientService.changePassword(userDTO, (Patient) user);
        }else if(user instanceof Nurse){
            return nurseService.changePassword(userDTO, (Nurse) user);
        }
        return null;
    }
}
