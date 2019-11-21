package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.common.RandomPasswordGenerator;
import ftn.tim16.ClinicalCentreSystem.dto.ClinicAdministratorDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.Authority;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicAdministratorRepository;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClinicAdministratorServiceImpl implements ClinicAdministratorService {

    @Autowired
    private ClinicAdministratorRepository clinicAdministratorRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    EmailNotificationService emailNotificationService;
/*
    @Override
    public List<ClinicAdministrator> getClinicAdministrators() {
        return clinicAdministratorRepository.findAll();
    }
*/

    @Override
    public ClinicAdministrator changePassword(String newPassword, ClinicAdministrator user) {
        user.setPassword(newPassword);
        if (user.getStatus().equals(UserStatus.NEVER_LOGGED_IN)) {
            user.setStatus(UserStatus.ACTIVE);
        }
        return clinicAdministratorRepository.save(user);
    }

    @Override
    public ClinicAdministrator getLoginAdmin() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        try {
            ClinicAdministrator clinicAdministrator = clinicAdministratorRepository.findByEmail(currentUser.getName());
            if (clinicAdministrator != null) {
                return clinicAdministrator;
            }
        } catch (UsernameNotFoundException ex) {

        }
        return null;
    }

    @Override
    public List<ClinicAdministratorDTO> getAllClinicAdministratorInClinic(Long id) {
        if(id == 0) {
            return convertToDTO(clinicAdministratorRepository.findAll());
        }

        List<ClinicAdministrator> adminsInClinic = clinicAdministratorRepository.findByClinicId(id);
        if (adminsInClinic == null) {
            return null;
        }

        return convertToDTO(adminsInClinic);
    }

    @Override
    public ClinicAdministrator create(ClinicAdministratorDTO clinicAdministratorDTO) {
        UserDetails userDetails = userService.findUserByEmail(clinicAdministratorDTO.getEmail());
        if (userDetails != null) {
            return null;
        }

        if (clinicAdministratorRepository.findByPhoneNumber(clinicAdministratorDTO.getPhoneNumber()) != null) {
            return null;
        }

        Clinic clinic = clinicRepository.findOneById(clinicAdministratorDTO.getClinic().getId());
        if (clinic == null) {
            return null;
        }

        RandomPasswordGenerator randomPasswordGenerator = new RandomPasswordGenerator();
        String generatedPassword = randomPasswordGenerator.generatePassword();
        String hashedPassword = passwordEncoder.encode(generatedPassword);

        List<Authority> authorities = authenticationService.findByName("ROLE_CLINIC_ADMIN");

        ClinicAdministrator newClinicAdministrator = new ClinicAdministrator(clinicAdministratorDTO.getEmail(), hashedPassword,
                clinicAdministratorDTO.getFirstName(), clinicAdministratorDTO.getLastName(), clinicAdministratorDTO.getPhoneNumber(),
                clinic, authorities);

        ClinicAdministrator clinicAdministrator = clinicAdministratorRepository.save(newClinicAdministrator);

        String subject = "New position: Clinic Administrator";
        StringBuilder sb = new StringBuilder();
        sb.append("You have been registered as a clinic administrator of a ");
        sb.append(clinic.getName());
        sb.append(" Clinic. From now on, you are in charge of managing the business of the clinic.");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("You can login to the Clinical Centre System web site using your email address and the following password:");
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("     ");
        sb.append(generatedPassword);
        sb.append(System.lineSeparator());
        sb.append(System.lineSeparator());
        sb.append("Because of the security protocol, you will have to change this given password the first time you log in.");
        String text = sb.toString();
        emailNotificationService.sendEmail(clinicAdministrator.getEmail(), subject, text);

        return clinicAdministrator;
    }

    private List<ClinicAdministratorDTO> convertToDTO(List<ClinicAdministrator> clinicAdmins) {
        List<ClinicAdministratorDTO> clinicAdminsDTO = new ArrayList<>();
        for (ClinicAdministrator clinicAdmin : clinicAdmins) {
            clinicAdminsDTO.add(new ClinicAdministratorDTO(clinicAdmin));
        }

        return clinicAdminsDTO;
    }
}
