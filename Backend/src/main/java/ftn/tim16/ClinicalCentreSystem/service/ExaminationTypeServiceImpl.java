package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicRepository;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class ExaminationTypeServiceImpl implements  ExaminationTypeService {
    @Autowired
    private ExaminationTypeRepository examinationTypeRepository;

    @Autowired
    private ClinicRepository clinicRepository;
    @Override
    public ExaminationType create(ExaminationType examinationType, ClinicAdministrator clinicAdministrator) {
        if(examinationTypeRepository.findByLabelIgnoringCase(examinationType.getLabel()) != null){
            return null;
        }
        examinationType.setStatus(LogicalStatus.EXISTING);
        examinationType.setClinic(clinicAdministrator.getClinic());
        examinationType.setDoctors(new HashSet<Doctor>());
        examinationType.setExaminations(new HashSet<Examination>());

        return examinationTypeRepository.save(examinationType);
    }

}
