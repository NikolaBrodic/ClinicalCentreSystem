package ftn.tim16.ClinicalCentreSystem.dto;

import org.joda.time.DateTime;

public class PatientFilterClinics {

    private DateTime examinationDate;
    private String examinationType;
    private String clinicAddress;
    private int clinicMinRating;
    private int examinationMaxPrice;

    public PatientFilterClinics() {

    }

    public PatientFilterClinics(DateTime examinationDate, String examinationType, String clinicAddress, int clinicMinRating, int examinationMaxPrice) {
        this.examinationDate = examinationDate;
        this.examinationType = examinationType;
        this.clinicAddress = clinicAddress;
        this.clinicMinRating = clinicMinRating;
        this.examinationMaxPrice = examinationMaxPrice;
    }

    public DateTime getExaminationDate() {
        return examinationDate;
    }

    public void setExaminationDate(DateTime examinationDate) {
        this.examinationDate = examinationDate;
    }

    public String getExaminationType() {
        return examinationType;
    }

    public void setExaminationType(String examinationType) {
        this.examinationType = examinationType;
    }

    public String getClinicAddress() {
        return clinicAddress;
    }

    public void setClinicAddress(String clinicAddress) {
        this.clinicAddress = clinicAddress;
    }

    public int getClinicMinRating() {
        return clinicMinRating;
    }

    public void setClinicMinRating(int clinicMinRating) {
        this.clinicMinRating = clinicMinRating;
    }

    public int getExaminationMaxPrice() {
        return examinationMaxPrice;
    }

    public void setExaminationMaxPrice(int examinationMaxPrice) {
        this.examinationMaxPrice = examinationMaxPrice;
    }

}
