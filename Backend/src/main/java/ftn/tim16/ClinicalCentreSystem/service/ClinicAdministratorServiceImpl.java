package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicAdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClinicAdministratorServiceImpl implements ClinicAdministratorService {

    @Autowired
    private ClinicAdministratorRepository clinicAdministratorRepository;

    @Override
    public List<ClinicAdministrator> getClinicAdministrators() {
        return clinicAdministratorRepository.findAll();
    }
}
