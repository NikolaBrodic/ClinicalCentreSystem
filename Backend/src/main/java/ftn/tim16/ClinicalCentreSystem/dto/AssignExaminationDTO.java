package ftn.tim16.ClinicalCentreSystem.dto;

import javax.validation.constraints.NotNull;

public class AssignExaminationDTO {

    @NotNull()
    private Long id;

    @NotNull()
    private RoomDTO room;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoomDTO getRoom() {
        return room;
    }

    public void setRoom(RoomDTO room) {
        this.room = room;
    }
}
