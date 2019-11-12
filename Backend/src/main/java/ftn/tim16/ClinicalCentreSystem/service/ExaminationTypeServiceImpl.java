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
public class ExaminationTypeServiceImpl implements ExaminationTypeService{
    @Autowired
    private ExaminationTypeRepository examinationTypeRepository;

    @Override
    public List<ExaminationTypeDTO> findAllTypesInClinic(Clinic clinic) {
        return convertToDTO(examinationTypeRepository.findByClinicIdAndStatus(clinic.getId(),LogicalStatus.EXISTING));
    }
    private List<ExaminationTypeDTO> convertToDTO(List<ExaminationType> examinationTypes){
        List<ExaminationTypeDTO> examinationTypeDTOS = new ArrayList<>();
        for (ExaminationType examinationType : examinationTypes) {
            examinationTypeDTOS.add(new ExaminationTypeDTO(examinationType));
        }
        return examinationTypeDTOS;
    }
}
