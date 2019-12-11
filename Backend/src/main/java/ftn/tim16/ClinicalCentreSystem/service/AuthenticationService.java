package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.LoggedInUserDTO;
import ftn.tim16.ClinicalCentreSystem.dto.PatientDTO;
import ftn.tim16.ClinicalCentreSystem.model.Authority;
import ftn.tim16.ClinicalCentreSystem.model.Patient;
import ftn.tim16.ClinicalCentreSystem.security.auth.JwtAuthenticationRequest;

import java.util.Set;

public interface AuthenticationService {
    Patient registerPatient(PatientDTO patientDTO);

    LoggedInUserDTO login(JwtAuthenticationRequest authenticationRequest);

    Set<Authority> findByName(String name);

    Set<Authority> findById(Long id);
}
