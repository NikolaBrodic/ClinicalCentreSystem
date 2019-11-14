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
<<<<<<< HEAD
public class ExaminationTypeServiceImpl implements  ExaminationTypeService {
    @Autowired
    private ExaminationTypeRepository examinationTypeRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Override
    public ExaminationType create(ExaminationTypeDTO examinationTypeDTO, ClinicAdministrator clinicAdministrator) {
        if(examinationTypeRepository.findByLabelIgnoringCase(examinationTypeDTO.getLabel()) != null){
            return null;
        }
        ExaminationType examinationType = new ExaminationType(examinationTypeDTO.getLabel(),examinationTypeDTO.getPrice(),
                clinicAdministrator.getClinic(),LogicalStatus.EXISTING);
        return examinationTypeRepository.save(examinationType);
    }

=======
public class ExaminationTypeServiceImpl implements ExaminationTypeService{
    @Autowired
    private ExaminationTypeRepository examinationTypeRepository;

>>>>>>> feature/addDoctor
    @Override
    public List<ExaminationTypeDTO> findAllTypesInClinic(Clinic clinic) {
        return convertToDTO(examinationTypeRepository.findByClinicIdAndStatus(clinic.getId(),LogicalStatus.EXISTING));
    }
<<<<<<< HEAD

    @Override
    public List<ExaminationTypeDTO> findAllTypesInClinic(Clinic clinic, Pageable page) {
        return convertToDTO(examinationTypeRepository.findByClinicIdAndStatus(clinic.getId(),LogicalStatus.EXISTING,page));
    }

    private List<ExaminationTypeDTO> convertToDTO(List<ExaminationType> examinationTypes){
        if(examinationTypes == null || examinationTypes.isEmpty()){
            return new ArrayList<>();
        }
        List<ExaminationTypeDTO> examinationTypeDTOS = new ArrayList<>();
        for (ExaminationType examinationType : examinationTypes) {
            examinationTypeDTOS.add(new ExaminationTypeDTO(examinationType));
        }
        return examinationTypeDTOS;
    }

    private List<ExaminationTypeDTO> convertToDTO(Page<ExaminationType> examinationTypes){
        if(examinationTypes == null){
            return new ArrayList<>();
        }
        if(examinationTypes.isEmpty()){
            return new ArrayList<>();
        }
=======
    private List<ExaminationTypeDTO> convertToDTO(List<ExaminationType> examinationTypes){
>>>>>>> feature/addDoctor
        List<ExaminationTypeDTO> examinationTypeDTOS = new ArrayList<>();
        for (ExaminationType examinationType : examinationTypes) {
            examinationTypeDTOS.add(new ExaminationTypeDTO(examinationType));
        }
        return examinationTypeDTOS;
    }
}
