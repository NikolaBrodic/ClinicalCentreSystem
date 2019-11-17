package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.PatientDTO;
import ftn.tim16.ClinicalCentreSystem.model.Authority;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.model.UserTokenState;
import ftn.tim16.ClinicalCentreSystem.security.auth.JwtAuthenticationRequest;

import java.util.List;

public interface AuthenticationService {
    Patient registerPatient(PatientDTO patientDTO);

    UserTokenState login(JwtAuthenticationRequest authenticationRequest);

    List<Authority> findByName(String name);

    List<Authority> findById(Long id);
}
