package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.PatientDTO;
import ftn.tim16.ClinicalCentreSystem.dto.response.LoggedInUserDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.AuthorityRepository;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import ftn.tim16.ClinicalCentreSystem.security.TokenUtils;
import ftn.tim16.ClinicalCentreSystem.security.auth.JwtAuthenticationRequest;
import ftn.tim16.ClinicalCentreSystem.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public PatientDTO registerPatient(PatientDTO patientDTO) {
        UserDetails userDetails = userService.findUserByEmail(patientDTO.getEmail());
        if (userDetails != null) {
            return null;
        }

        if (patientRepository.findByHealthInsuranceId(patientDTO.getHealthInsuranceID()) != null) {
            return null;
        }

        if (patientRepository.findByPhoneNumber(patientDTO.getPhoneNumber()) != null) {
            return null;
        }

        String hashedPassword = passwordEncoder.encode(patientDTO.getPassword());
        Set<Authority> authorities = findByName("ROLE_PATIENT");

        Patient newPatient = new Patient(patientDTO.getEmail(), hashedPassword, patientDTO.getFirstName(),
                patientDTO.getLastName(), patientDTO.getPhoneNumber(), patientDTO.getAddress(), patientDTO.getCity(),
                patientDTO.getCountry(), patientDTO.getHealthInsuranceID(), authorities);

        return new PatientDTO(patientRepository.save(newPatient));
    }

    @Override
    public LoggedInUserDTO login(JwtAuthenticationRequest authenticationRequest) {
        final Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String username = returnUsername(authentication.getPrincipal());
        if (username == null) {
            return null;
        }

        String jwt = tokenUtils.generateToken(username);
        int expiresIn = tokenUtils.getExpiredIn();
        return returnLoggedInUser(authentication.getPrincipal(), new UserTokenState(jwt, expiresIn));
    }

    @Override
    public Set<Authority> findByName(String name) {
        Authority auth = this.authorityRepository.findByName(name);
        Set<Authority> authorities = new HashSet<>();
        authorities.add(auth);
        return authorities;
    }

    @Override
    public Set<Authority> findById(Long id) {
        Authority auth = this.authorityRepository.getOne(id);
        Set<Authority> authorities = new HashSet<>();
        authorities.add(auth);
        return authorities;
    }

    private String returnUsername(Object object) {
        if (object instanceof ClinicalCentreAdministrator) {
            return ((ClinicalCentreAdministrator) object).getUsername();
        } else if (object instanceof ClinicAdministrator) {
            return ((ClinicAdministrator) object).getUsername();
        } else if (object instanceof Patient) {
            return ((Patient) object).getUsername();
        } else if (object instanceof Doctor) {
            return ((Doctor) object).getUsername();
        } else if (object instanceof Nurse) {
            return ((Nurse) object).getUsername();
        }

        return null;
    }

    private LoggedInUserDTO returnLoggedInUser(Object object, UserTokenState userTokenState) {
        if (object instanceof ClinicalCentreAdministrator) {
            ClinicalCentreAdministrator clinicalCentreAdministrator = (ClinicalCentreAdministrator) object;

            return new LoggedInUserDTO(clinicalCentreAdministrator.getId(), clinicalCentreAdministrator.getEmail(),
                    "CLINICAL_CENTRE_ADMIN", userTokenState);
        } else if (object instanceof ClinicAdministrator) {
            ClinicAdministrator clinicAdministrator = (ClinicAdministrator) object;
            return new LoggedInUserDTO(clinicAdministrator.getId(), clinicAdministrator.getEmail(),
                    "CLINIC_ADMIN", userTokenState);
        } else if (object instanceof Patient) {
            Patient patient = (Patient) object;
            return new LoggedInUserDTO(patient.getId(), patient.getEmail(),
                    "PATIENT", userTokenState);
        } else if (object instanceof Doctor) {
            Doctor doctor = (Doctor) object;
            return new LoggedInUserDTO(doctor.getId(), doctor.getEmail(),
                    "DOCTOR", userTokenState);
        } else if (object instanceof Nurse) {
            Nurse nurse = (Nurse) object;
            return new LoggedInUserDTO(nurse.getId(), nurse.getEmail(),
                    "NURSE", userTokenState);
        }

        return null;
    }

    public String getHashedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
