package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.response.PrescriptionDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.PrescriptionStatus;
import ftn.tim16.ClinicalCentreSystem.model.Prescription;
import ftn.tim16.ClinicalCentreSystem.repository.PrescriptionRepository;
import ftn.tim16.ClinicalCentreSystem.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Override
    public List<PrescriptionDTO> getPrescriptionsForNurse(Long nurseId) {
        return convertToDTO(prescriptionRepository.findByNurseIdAndStatus(nurseId, PrescriptionStatus.AWAITING));
    }

    @Override
    public PrescriptionDTO stampPrescription(Long prescriptionId, Long nurseId) {
        Prescription prescription = prescriptionRepository.findByIdAndNurseIdAndStatus(prescriptionId, nurseId, PrescriptionStatus.AWAITING);
        if (prescription == null) {
            return null;
        }

        prescription.setStatus(PrescriptionStatus.STAMPED);
        return new PrescriptionDTO(prescriptionRepository.save(prescription));
    }

    private List<PrescriptionDTO> convertToDTO(List<Prescription> prescriptions) {
        if (prescriptions == null || prescriptions.isEmpty()) {
            return new ArrayList<>();
        }
        List<PrescriptionDTO> prescriptionDTOS = new ArrayList<>();
        for (Prescription prescription : prescriptions) {
            prescriptionDTOS.add(new PrescriptionDTO(prescription));
        }
        return prescriptionDTOS;
    }
}
