package ftn.tim16.ClinicalCentreSystem.dto;

import ftn.tim16.ClinicalCentreSystem.model.Examination;
import org.springframework.data.domain.Page;

import java.util.List;

public class ExaminationPagingDTO {

    private List<Examination> examinationList;
    private Integer numberOfItems;

    public ExaminationPagingDTO(List<Examination> examinationList, Integer numberOfItems) {
        this.examinationList = examinationList;
        this.numberOfItems = numberOfItems;
    }

    public List<Examination> getExaminationList() {
        return examinationList;
    }

    public void setExaminationList(List<Examination> examinationList) {
        this.examinationList = examinationList;
    }

    public Integer getNumberOfItems() {
        return numberOfItems;
    }

    public void setNumberOfItems(Integer numberOfItems) {
        this.numberOfItems = numberOfItems;
    }
}
