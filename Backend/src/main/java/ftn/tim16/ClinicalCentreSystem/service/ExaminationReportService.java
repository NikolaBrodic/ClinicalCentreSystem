package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.requestandresponse.ExaminationReportDTO;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;

public interface ExaminationReportService {

    ExaminationReportDTO create(Doctor doctor, Examination examination, ExaminationReportDTO examinationReportDTO);

}
