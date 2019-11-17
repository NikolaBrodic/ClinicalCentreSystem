package ftn.tim16.ClinicalCentreSystem.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class RoomDTO {

    private Long id;

    @NotEmpty(message = "Label is empty.")
    @Size(message="Max size for label is 30.",max = 30)
    private String label;

    @NotNull(message="Kind is null.")
    private String kind;

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

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }
}
