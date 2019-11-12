package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;

public class ExaminationTypeDTO {
    private Long id;
    private String label;
    private Double price;

    public ExaminationTypeDTO() {
    }

    public ExaminationTypeDTO(Long id, String label, Double price) {
        super();
        this.id = id;
        this.label = label;
        this.price = price;
    }
    public ExaminationTypeDTO(ExaminationType examinationType) {
        this(examinationType.getId(),examinationType.getLabel(),examinationType.getPrice());
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
