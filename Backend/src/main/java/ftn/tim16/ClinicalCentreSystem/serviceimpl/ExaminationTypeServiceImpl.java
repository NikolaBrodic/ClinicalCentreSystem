package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.CreateExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.dto.ExaminationTypeDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.Clinic;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
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
    private ExaminationService examinationService;

    @Autowired
    private DoctorService doctorService;

    @Override
    public ExaminationType create(CreateExaminationTypeDTO examinationTypeDTO, Clinic clinic) {
        if (examinationTypeRepository.findByLabelIgnoringCase(examinationTypeDTO.getLabel()) != null) {
            return null;
        }
        ExaminationType examinationType = new ExaminationType(examinationTypeDTO.getLabel(), examinationTypeDTO.getPrice(),
                clinic, LogicalStatus.EXISTING);
        return examinationTypeRepository.save(examinationType);
    }

    @Override
    public ExaminationType edit(ExaminationTypeDTO examinationType, Long clinicId) {
        ExaminationType existingExaminationType = findById(examinationType.getId());
        if (existingExaminationType == null) {
            return null;
        }
        ExaminationType examinationTypeWithSameLabel = examinationTypeRepository.findByLabelIgnoringCase(examinationType.getLabel());
        if (examinationTypeWithSameLabel != null && examinationTypeWithSameLabel.getId() != examinationType.getId()) {
            return null;
        }
        if (!isEditable(examinationType.getId(), existingExaminationType.getClinic().getId(), clinicId)) {
            return null;
        }
        existingExaminationType.setLabel(examinationType.getLabel());
        existingExaminationType.setPrice(examinationType.getPrice());
        return examinationTypeRepository.save(existingExaminationType);
    }

    private boolean isEditable(Long examinationTypeId, Long examinationTypeClinicId, Long clinicId) {
        if (examinationTypeClinicId != clinicId) {
            return false;
        }
        List<Doctor> doctors = doctorService.findDoctorsByClinicIdAndExaminationTypeId(clinicId, examinationTypeId);
        if (doctors != null && !doctors.isEmpty()) {
            return false;
        }

        List<Examination> upcomingExaminations = examinationService.getUpcomingExaminationsOfExaminationType(examinationTypeId);

        if (upcomingExaminations != null && !upcomingExaminations.isEmpty()) {
            return false;
        }
        return true;
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
