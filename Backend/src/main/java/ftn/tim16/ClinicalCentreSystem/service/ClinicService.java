package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ClinicDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;

import java.util.List;

public interface ClinicService {
    Clinic findById(Long id);

    Clinic findByName(String name);

    Clinic findByAddress(String address);

    Clinic create(ClinicDTO clinicDTO);

    List<Clinic> findAll();
}
