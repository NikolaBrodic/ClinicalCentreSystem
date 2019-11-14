package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;

public interface UserService {
    public Object changePassword(UserDTO userDTO,Object user);
}
