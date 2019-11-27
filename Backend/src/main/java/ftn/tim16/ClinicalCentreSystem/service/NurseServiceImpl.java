package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.NurseDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import ftn.tim16.ClinicalCentreSystem.repository.NurseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NurseServiceImpl implements NurseService {
    @Autowired
    private NurseRepository nurseRepository;

    public Nurse changePassword(String newPassword, Nurse user) {
        user.setPassword(newPassword);
        if (user.getStatus().equals(UserStatus.NEVER_LOGGED_IN)) {
            user.setStatus(UserStatus.ACTIVE);
        }
        return nurseRepository.save(user);
    }

    @Override
    public List<NurseDTO> getAllNursesInClinic(Long id) {
        return convertToDTO(nurseRepository.findAllByClinicId(id));
    }

    @Override
    public List<NurseDTO> getAllNursesInClinic(Long id, Pageable page) {
        return convertToDTO(nurseRepository.findAllByClinicId(id, page));
    }

    private List<NurseDTO> convertToDTO(List<Nurse> nurses) {
        List<NurseDTO> nursesDTO = new ArrayList<>();
        for (Nurse nurse : nurses) {
            nursesDTO.add(new NurseDTO(nurse));
        }

        return nursesDTO;
    }

    private List<NurseDTO> convertToDTO(Page<Nurse> nurses) {
        List<NurseDTO> nursesDTO = new ArrayList<>();
        for (Nurse nurse : nurses) {
            nursesDTO.add(new NurseDTO(nurse));
        }

        return nursesDTO;
    }
}