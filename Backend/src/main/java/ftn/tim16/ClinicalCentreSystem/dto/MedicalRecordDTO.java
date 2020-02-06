package ftn.tim16.ClinicalCentreSystem.dto;


import ftn.tim16.ClinicalCentreSystem.model.ExaminationReport;
import ftn.tim16.ClinicalCentreSystem.model.MedicalRecord;

import java.util.ArrayList;

public class MedicalRecordDTO {

    private String ime;
    private String prezime;
    private Integer height;
    private Integer weight;
    private String bloodType;
    private String allergies;
    private ArrayList<MedicalExaminationDTO> examinations = new ArrayList<>();

    public MedicalRecordDTO(MedicalRecord mr){
        this.ime = mr.getPatient().getFirstName();
        this.prezime = mr.getPatient().getLastName();
        this.height = mr.getHeight();
        this.weight = mr.getWeight();
        this.bloodType = mr.getBloodType();
        this.allergies = mr.getAllergies();
        for(ExaminationReport er : mr.getExaminationReports()){

            System.out.println(er.getComment());
            examinations.add(new MedicalExaminationDTO(er));
        }
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

    public ArrayList<MedicalExaminationDTO> getExaminations() {
        return examinations;
    }

    public void setExaminations(ArrayList<MedicalExaminationDTO> examinations) {
        this.examinations = examinations;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }
}
