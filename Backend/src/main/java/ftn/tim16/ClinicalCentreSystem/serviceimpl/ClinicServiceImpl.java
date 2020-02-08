package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.ClinicDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicRepository;
import ftn.tim16.ClinicalCentreSystem.service.ClinicService;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ClinicServiceImpl implements ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    @Override
    public ClinicDTO findById(Long id) {
        Clinic clinic = clinicRepository.findOneById(id);
        if (clinic == null) {
            return null;
        }

        return new ClinicDTO(clinic);
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

    @Override
    public List<Clinic> findAll() {
        return clinicRepository.findAll();
    }

    @Override
    public List<Clinic> findClinicsByExaminations(Examination examination) {
        return clinicRepository.findByExaminations(examination);
    }

    @Override
    public List<Clinic> findByAddressContainsIgnoringCaseAndClinicRatingIsGreaterThanEqual(
            String address, int clinicRating) {
        return clinicRepository.findByAddressContainsIgnoringCaseAndClinicRatingIsGreaterThanEqual(
                address, clinicRating);
    }

    @Override
    public Clinic findOneByName(String name) {
        return clinicRepository.findByNameIgnoringCase(name);
    }

}
