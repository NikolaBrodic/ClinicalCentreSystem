package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;

public interface UserService {
    Object changePassword(UserDTO userDTO, Object user);

    Object findUserByEmail(String email);

    boolean neverLoggedIn(String email);
}
