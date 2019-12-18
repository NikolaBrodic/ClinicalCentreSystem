package ftn.tim16.ClinicalCentreSystem.dto.requestandresponse;

import ftn.tim16.ClinicalCentreSystem.model.ExaminationReport;
import ftn.tim16.ClinicalCentreSystem.model.Prescription;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

public class ExaminationReportDTO {
    @NotEmpty(message = "Comment is empty.")
    private String comment;

    @NotNull(message = "Diagnose is null.")
    private DiagnoseDTO diagnose;

    private List<MedicineDTO> medicines;

    public ExaminationReportDTO() {
    }

    public ExaminationReportDTO(String comment, DiagnoseDTO diagnose, List<MedicineDTO> medicines) {
        this.comment = comment;
        this.diagnose = diagnose;
        this.medicines = medicines;
    }

    public ExaminationReportDTO(ExaminationReport examinationReport) {
        this.comment = examinationReport.getComment();

        if (examinationReport.getDiagnose() != null) {
            this.diagnose = new DiagnoseDTO(examinationReport.getDiagnose());
        }

        if (examinationReport.getPrescriptions() != null) {
            List<MedicineDTO> medicineDTOs = new ArrayList<>();
            for (Prescription prescription : examinationReport.getPrescriptions()) {
                medicineDTOs.add(new MedicineDTO(prescription.getMedicine()));
            }
            this.medicines = medicineDTOs;
        }
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public DiagnoseDTO getDiagnose() {
        return diagnose;
    }

    public void setDiagnose(DiagnoseDTO diagnose) {
        this.diagnose = diagnose;
    }

    public List<MedicineDTO> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<MedicineDTO> medicines) {
        this.medicines = medicines;
    }
}
