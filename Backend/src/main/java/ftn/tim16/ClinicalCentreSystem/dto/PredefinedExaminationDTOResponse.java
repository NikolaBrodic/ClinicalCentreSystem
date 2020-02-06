package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.Examination;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

public class PredefinedExaminationDTOResponse {
    private Long id;
    private String startTime;
    private String endTime;
    private String type;
    private Double price;
    private Integer discount;
    private String clinic;
    private String room;

    public PredefinedExaminationDTOResponse(Examination e) {
        this.id = e.getId();
        this.startTime = e.getInterval().getStartDateTime().toString();
        this.endTime = e.getInterval().getEndDateTime().toString();
        /*this.startTime = e.getInterval().getStartDateTime().format(
                DateTimeFormatter.ofLocalizedDateTime(FormatStyle.valueOf("YYYY-MM-DD"),
                FormatStyle.valueOf("HH-MM")));
        this.endTime = e.getInterval().getEndDateTime().format(
                DateTimeFormatter.ofLocalizedDateTime(FormatStyle.valueOf("YYYY-MM-DD"),
                        FormatStyle.valueOf("HH-MM")));*/
        this.type = e.getExaminationType().getLabel();
        this.price = e.getExaminationType().getPrice();
        this.discount = e.getDiscount();
        this.clinic = e.getClinic().getName();
        this.room = e.getRoom().getLabel();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long examinationId) {
        this.id = examinationId;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        type = type;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getClinic() {
        return clinic;
    }

    public void setClinic(String clinic) {
        this.clinic = clinic;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }
}
