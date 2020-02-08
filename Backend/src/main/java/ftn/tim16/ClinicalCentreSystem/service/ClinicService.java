package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ClinicDTO;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import org.joda.time.DateTime;

import java.util.List;
import java.util.Set;

public interface ClinicService {
    ClinicDTO findById(Long id);

    Clinic findByName(String name);

    Clinic findByAddress(String address);

    Clinic create(ClinicDTO clinicDTO);

    List<Clinic> findAll();

    List<Clinic> findClinicsByExaminations(Examination examination);

    List<Clinic> findByAddressContainsIgnoringCaseAndClinicRatingIsGreaterThanEqual(
            String address, int clinicRating
    );
    Clinic findOneByName(String name);
}
