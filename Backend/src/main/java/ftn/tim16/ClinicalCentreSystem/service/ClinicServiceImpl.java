package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ClinicDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired
    ClinicRepository clinicRepository;

    @Override
    public Clinic findById(Long id) {
        return clinicRepository.findOneById(id);
    }

    @Override
    public Clinic findByName(String name) {
        return clinicRepository.findByNameIgnoringCase(name);
    }

    @Override
    public Clinic findByAddress(String address) {
        return clinicRepository.findByAddressIgnoringCase(address);
    }

    @Override
    public Clinic create(ClinicDTO clinicDTO) {
        if (findByName(clinicDTO.getName()) != null || findByAddress(clinicDTO.getAddress()) != null) {
            return null;
        }

        Clinic clinic = new Clinic(clinicDTO.getName(), clinicDTO.getDescription(), clinicDTO.getAddress());

        return clinicRepository.save(clinic);
    }
}
