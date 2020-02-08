package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.Doctor;

public class DoctorGradingDTO {
    private Long id;
    private String ime;
    private String prezime;

    public DoctorGradingDTO(Doctor d){
        this.id = d.getId();
        this.ime = d.getFirstName();
        this.prezime =d.getLastName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

}
