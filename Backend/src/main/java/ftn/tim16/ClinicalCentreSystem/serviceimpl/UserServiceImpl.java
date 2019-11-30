package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.DoctorStatus;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.*;
import ftn.tim16.ClinicalCentreSystem.service.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    protected final Log LOGGER = LogFactory.getLog(getClass());

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

    @Autowired
    private ClinicAdministratorRepository clinicAdministratorRepository;

    @Autowired
    private ClinicalCentreAdministratorRepository clinicalCentreAdministratorRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private NurseRepository nurseRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails userDetails = findUserByEmail(email);
        if (userDetails != null) {
            return userDetails;
        }
        throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
    }

    //TODO: Change this method using FACTORY
    @Override
    public UserDetails changePassword(UserDTO userDTO) {
        UserDetails user = findUserByEmail(userDTO.getEmail());

        if (user == null) {
            return null;
        }

        if (!passwordEncoder.matches(userDTO.getOldPassword(), user.getPassword())) {
            return null;
        }

        String newPassword = passwordEncoder.encode(userDTO.getNewPassword());
        if (user instanceof ClinicAdministrator) {
            return clinicAdministratorService.changePassword(newPassword, (ClinicAdministrator) user);
        } else if (user instanceof ClinicalCentreAdministrator) {
            return clinicalCentreAdministratorService.changePassword(newPassword, (ClinicalCentreAdministrator) user);
        } else if (user instanceof Doctor) {
            return doctorService.changePassword(newPassword, (Doctor) user);
        } else if (user instanceof Patient) {
            return patientService.changePassword(newPassword, (Patient) user);
        } else if (user instanceof Nurse) {
            return nurseService.changePassword(newPassword, (Nurse) user);
        }
        return null;
    }

    @Override
    public UserDetails findUserByEmail(String email) {
        try {
            ClinicalCentreAdministrator clinicalCentreAdministrator = clinicalCentreAdministratorRepository.findByEmail(email);
            if (clinicalCentreAdministrator != null) {
                return clinicalCentreAdministrator;
            }
        } catch (UsernameNotFoundException ex) {

        }

        try {
            ClinicAdministrator clinicAdministrator = clinicAdministratorRepository.findByEmail(email);
            if (clinicAdministrator != null) {
                return clinicAdministrator;
            }
        } catch (UsernameNotFoundException ex) {

        }

        try {
            Patient patient = patientRepository.findByEmail(email);
            if (patient != null) {
                return patient;
            }
        } catch (UsernameNotFoundException ex) {

        }

        try {
            Nurse nurse = nurseRepository.findByEmail(email);
            if (nurse != null) {
                return nurse;
            }
        } catch (UsernameNotFoundException ex) {

        }
        try {
            Doctor doctor = doctorRepository.findByEmail(email);
            if (doctor != null) {
                return doctor;
            }
        } catch (UsernameNotFoundException ex) {

        }
        return null;
    }

    @Override
    public UserDetails findUserByPhoneNumber(String phoneNumber) {
        ClinicalCentreAdministrator clinicalCentreAdministrator = clinicalCentreAdministratorRepository.findByPhoneNumber(phoneNumber);
        if (clinicalCentreAdministrator != null) {
            return clinicalCentreAdministrator;
        }

        ClinicAdministrator clinicAdministrator = clinicAdministratorRepository.findByPhoneNumber(phoneNumber);
        if (clinicAdministrator != null) {
            return clinicAdministrator;
        }

        Patient patient = patientRepository.findByPhoneNumber(phoneNumber);
        if (patient != null) {
            return patient;
        }

        Nurse nurse = nurseRepository.findByPhoneNumber(phoneNumber);
        if (nurse != null) {
            return nurse;
        }

        Doctor doctor = doctorRepository.findByPhoneNumber(phoneNumber);
        if (doctor != null) {
            return doctor;
        }

        return null;
    }

    @Override
    public boolean neverLoggedIn(String email) {
        try {
            ClinicalCentreAdministrator clinicalCentreAdministrator = clinicalCentreAdministratorRepository.findByEmail(email);
            if (clinicalCentreAdministrator != null) {
                if (clinicalCentreAdministrator.getStatus() == UserStatus.NEVER_LOGGED_IN) {
                    return true;
                }
                return false;
            }
        } catch (UsernameNotFoundException ex) {

        }

        try {
            ClinicAdministrator clinicAdministrator = clinicAdministratorRepository.findByEmail(email);
            if (clinicAdministrator != null) {
                if (clinicAdministrator.getStatus() == UserStatus.NEVER_LOGGED_IN) {
                    return true;
                }
                return false;
            }
        } catch (UsernameNotFoundException ex) {

        }

        try {
            Nurse nurse = nurseRepository.findByEmail(email);
            if (nurse != null) {
                if (nurse.getStatus() == UserStatus.NEVER_LOGGED_IN) {
                    return true;
                }
                return false;
            }
        } catch (UsernameNotFoundException ex) {

        }
        try {
            Doctor doctor = doctorRepository.findByEmail(email);
            if (doctor != null) {
                if (doctor.getStatus() == DoctorStatus.NEVER_LOGGED_IN) {
                    return true;
                }
                return false;
            }
        } catch (UsernameNotFoundException ex) {

        }
        return false;
    }

    public UserDetails getLoggedInUser() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        return findUserByEmail(currentUser.getName());
    }
}
