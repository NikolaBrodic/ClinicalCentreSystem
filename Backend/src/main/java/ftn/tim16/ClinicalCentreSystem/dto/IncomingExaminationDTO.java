package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.Examination;

import java.time.LocalDateTime;
import java.util.Date;

public class IncomingExaminationDTO {
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String type;
    private Double price;
    private Integer discount;
    private String clinic;
    private String room;

    public IncomingExaminationDTO(Examination e){
        this.id = e.getId();
        this.startTime = e.getInterval().getStartDateTime();
        this.endTime = e.getInterval().getEndDateTime();
        this.type = e.getExaminationType().getLabel();
        this.price =e.getExaminationType().getPrice();
        this.discount = e.getDiscount();
        this.clinic = e.getClinic().getName();
        this.room =e.getRoom().getLabel();
    }

    public IncomingExaminationDTO(){

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
