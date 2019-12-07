package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {
    UserDetails changePassword(UserDTO userDTO);

    Object findUserByEmail(String email);

    UserDetails findUserByPhoneNumber(String phoneNumber);

    boolean neverLoggedIn(String email);

    UserDetails getLoggedInUser();

}
