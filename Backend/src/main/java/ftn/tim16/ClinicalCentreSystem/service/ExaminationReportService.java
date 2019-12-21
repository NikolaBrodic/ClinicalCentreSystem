package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.ExaminationReportDTO;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationReport;

public interface ExaminationReportService {

    ExaminationReport findByExaminationId(Long examinationId);

    ExaminationReportDTO create(Doctor doctor, Examination examination, ExaminationReportDTO examinationReportDTO);

}
