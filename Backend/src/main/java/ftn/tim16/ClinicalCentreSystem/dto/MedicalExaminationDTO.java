package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.ExaminationReport;
import ftn.tim16.ClinicalCentreSystem.model.Prescription;

import java.util.HashSet;
import java.util.Set;

public class MedicalExaminationDTO {

    private String comment;
    private String diagnose;
    private Set<String> prescriptions = new HashSet<>();

    public MedicalExaminationDTO(ExaminationReport er){
        this.comment = er.getComment();
        this.diagnose = er.getDiagnose().getTitle();
        for(Prescription p : er.getPrescriptions()){
            prescriptions.add(p.getMedicine().getLabel());
        }
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getDiagnose() {
        return diagnose;
    }

    public void setDiagnose(String diagnose) {
        this.diagnose = diagnose;
    }

    public Set<String> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(Set<String> prescriptions) {
        this.prescriptions = prescriptions;
    }
}
