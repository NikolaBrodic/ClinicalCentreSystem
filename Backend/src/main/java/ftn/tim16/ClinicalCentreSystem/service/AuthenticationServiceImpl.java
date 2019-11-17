package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.PatientDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.AuthorityRepository;
import ftn.tim16.ClinicalCentreSystem.repository.PatientRepository;
import ftn.tim16.ClinicalCentreSystem.security.TokenUtils;
import ftn.tim16.ClinicalCentreSystem.security.auth.JwtAuthenticationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    TokenUtils tokenUtils;

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
    public Patient registerPatient(PatientDTO patientDTO) {
        UserDetails userDetails = userService.findUserByEmail(patientDTO.getEmail());
        if (userDetails != null) {
            return null;
        }

        if (patientRepository.findByHealthInsuranceID(patientDTO.getHealthInsuranceID()) != null) {
            return null;
        }

        if (patientRepository.findByPhoneNumber(patientDTO.getPhoneNumber()) != null) {
            return null;
        }

        String hashedPassword = passwordEncoder.encode(patientDTO.getPassword());
        List<Authority> authorities = findByName("ROLE_PATIENT");

        Patient newPatient = new Patient(patientDTO.getEmail(), hashedPassword, patientDTO.getFirstName(),
                patientDTO.getLastName(), patientDTO.getPhoneNumber(), patientDTO.getAddress(), patientDTO.getCity(),
                patientDTO.getCountry(), patientDTO.getHealthInsuranceID(), authorities);

        return patientRepository.save(newPatient);
    }

    @Override
    public UserTokenState login(JwtAuthenticationRequest authenticationRequest) {
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

        return new UserTokenState(jwt, expiresIn);
    }

    @Override
    public List<Authority> findByName(String name) {
        Authority auth = this.authorityRepository.findByName(name);
        List<Authority> authorities = new ArrayList<>();
        authorities.add(auth);
        return authorities;
    }

    @Override
    public List<Authority> findById(Long id) {
        Authority auth = this.authorityRepository.getOne(id);
        List<Authority> authorities = new ArrayList<>();
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

    public String getHashedPassword(String password){
        return passwordEncoder.encode(password);
    }
}
