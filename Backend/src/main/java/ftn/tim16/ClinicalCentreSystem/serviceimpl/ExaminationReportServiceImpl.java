package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.ExaminationReportDTO;
import ftn.tim16.ClinicalCentreSystem.model.*;
import ftn.tim16.ClinicalCentreSystem.repository.ExaminationReportRepository;
import ftn.tim16.ClinicalCentreSystem.service.DiagnoseService;
import ftn.tim16.ClinicalCentreSystem.service.ExaminationReportService;
import ftn.tim16.ClinicalCentreSystem.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class ExaminationReportServiceImpl implements ExaminationReportService {

    @Autowired
    private ExaminationReportRepository examinationReportRepository;

    @Autowired
    private DiagnoseService diagnoseService;

    @Autowired
    private MedicineService medicineService;

    @Override
    public ExaminationReportDTO create(Doctor doctor, Examination examination, ExaminationReportDTO examinationReportDTO) {

        Diagnose diagnose = diagnoseService.findById(examinationReportDTO.getDiagnoseId());
        if (diagnose == null) {
            return null;
        }

        ExaminationReport examinationReport = new ExaminationReport(LocalDateTime.now(),
                examinationReportDTO.getComment(), examination.getPatient().getMedicalRecord(),
                diagnose, doctor, examination);

        Set<Prescription> prescriptions = new HashSet<>();
        for (Long medicineId : examinationReportDTO.getMedicineIds()) {
            Medicine medicine = medicineService.findById(medicineId);
            if (medicine == null) {
                return null;
            }
            Prescription prescription = new Prescription(medicine, examinationReport, examination.getNurse());
            prescriptions.add(prescription);
        }
        examinationReport.setPrescriptions(prescriptions);

        ExaminationReport createdExaminationReport = examinationReportRepository.save(examinationReport);

        return new ExaminationReportDTO(createdExaminationReport);
    }
}
