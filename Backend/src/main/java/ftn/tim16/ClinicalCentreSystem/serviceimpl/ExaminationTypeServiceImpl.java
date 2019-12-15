package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationTypeRepository;
import ftn.tim16.ClinicalCentreSystem.service.DoctorService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExaminationTypeServiceImpl implements ExaminationTypeService {

    @Autowired
    private ExaminationTypeRepository examinationTypeRepository;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ExaminationService examinationService;

    @Override
    public ExaminationType create(ExaminationTypeDTO examinationTypeDTO, ClinicAdministrator clinicAdministrator) {
        if (examinationTypeRepository.findByLabelIgnoringCase(examinationTypeDTO.getLabel()) != null) {
            return null;
        }
        ExaminationType examinationType = new ExaminationType(examinationTypeDTO.getLabel(), examinationTypeDTO.getPrice(),
                clinicAdministrator.getClinic(), LogicalStatus.EXISTING);
        return examinationTypeRepository.save(examinationType);
    }

    @Override
    public List<ExaminationTypeDTO> findAllTypesInClinic(Long clinic_id) {
        return convertToDTO(examinationTypeRepository.findByClinicIdAndStatus(clinic_id, LogicalStatus.EXISTING));
    }

    @Override
    public List<ExaminationTypeDTO> searchTypesInClinic(Clinic clinic, String searchLabel, Double searchPrice) {
        if (searchPrice != null) {
            return convertToDTO(examinationTypeRepository.findByClinicIdAndStatusAndLabelContainsIgnoringCaseAndPrice(clinic.getId(), LogicalStatus.EXISTING,
                    searchLabel, searchPrice));
        }
        return convertToDTO(examinationTypeRepository.findByClinicIdAndStatusAndLabelContainsIgnoringCase(clinic.getId(),
                LogicalStatus.EXISTING, searchLabel));
    }

    @Override
    public ExaminationType findById(Long id) {
        return examinationTypeRepository.findByIdAndStatusNot(id, LogicalStatus.DELETED);
    }

    @Override
    public ExaminationType deleteExaminationType(Long clinic_id, Long examinationTypeId) {
        ExaminationType examinationType = findById(examinationTypeId);

        if (examinationType.getClinic().getId() != clinic_id) {
            return null;
        }
        List<Doctor> doctors = doctorService.findDoctorsByClinicIdAndExaminationTypeId(clinic_id, examinationTypeId);
        if (doctors != null && !doctors.isEmpty()) {
            return null;
        }

        List<Examination> upcomingExaminations = examinationService.getUpcomingExaminationsOfExaminationType(examinationTypeId);

        if (upcomingExaminations != null && !upcomingExaminations.isEmpty()) {
            return null;
        }
        examinationType.setStatus(LogicalStatus.DELETED);

        return examinationTypeRepository.save(examinationType);
    }

    private List<ExaminationTypeDTO> convertToDTO(List<ExaminationType> examinationTypes) {
        if (examinationTypes == null || examinationTypes.isEmpty()) {
            return new ArrayList<>();
        }
        List<ExaminationTypeDTO> examinationTypeDTOS = new ArrayList<>();
        for (ExaminationType examinationType : examinationTypes) {
            examinationTypeDTOS.add(new ExaminationTypeDTO(examinationType));
        }
        return examinationTypeDTOS;
    }


}
