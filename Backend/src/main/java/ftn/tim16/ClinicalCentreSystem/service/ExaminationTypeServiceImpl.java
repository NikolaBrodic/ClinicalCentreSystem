package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.ClinicRepository;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

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

    @Override
    public List<ExaminationTypeDTO> findAllTypesInClinic(Clinic clinic) {
        return convertToDTO(examinationTypeRepository.findByClinicIdAndStatus(clinic.getId(),LogicalStatus.EXISTING));
    }

    @Override
    public List<ExaminationTypeDTO> findAllTypesInClinic(Clinic clinic, Pageable page) {
        return convertToDTO(examinationTypeRepository.findByClinicIdAndStatus(clinic.getId(),LogicalStatus.EXISTING,page));
    }

    private List<ExaminationTypeDTO> convertToDTO(List<ExaminationType> examinationTypes){
        List<ExaminationTypeDTO> examinationTypeDTOS = new ArrayList<>();
        for (ExaminationType examinationType : examinationTypes) {
            examinationTypeDTOS.add(new ExaminationTypeDTO(examinationType));
        }
        return examinationTypeDTOS;
    }

    private List<ExaminationTypeDTO> convertToDTO(Page<ExaminationType> examinationTypes){
        List<ExaminationTypeDTO> examinationTypeDTOS = new ArrayList<>();
        for (ExaminationType examinationType : examinationTypes) {
            examinationTypeDTOS.add(new ExaminationTypeDTO(examinationType));
        }
        return examinationTypeDTOS;
    }
}
