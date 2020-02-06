package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.Examination;

public class ExaminationIdDTO {
    private Long id;

    public ExaminationIdDTO(){

    }
    public ExaminationIdDTO(Long id){
        this.id = id;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
