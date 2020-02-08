package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.Clinic;

public class ClinicGradingDTO {
    private Long id;
    private String name;

    public ClinicGradingDTO(Clinic c) {
        this.id = c.getId();
        this.name = c.getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
