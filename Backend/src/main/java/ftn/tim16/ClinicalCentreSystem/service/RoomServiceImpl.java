package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.RoomDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.ExaminationKind;
import ftn.tim16.ClinicalCentreSystem.enumeration.LogicalStatus;
import ftn.tim16.ClinicalCentreSystem.model.ClinicAdministrator;
import ftn.tim16.ClinicalCentreSystem.model.ExaminationType;
import ftn.tim16.ClinicalCentreSystem.model.Room;
import ftn.tim16.ClinicalCentreSystem.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements RoomService{

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room create(RoomDTO roomDTO, ClinicAdministrator clinicAdministrator) {
        if(roomRepository.findByLabelIgnoringCase(roomDTO.getLabel()) != null){
            return null;
        }
        ExaminationKind examinationKind = getKind(roomDTO.getKind());
        if(examinationKind == null){
            return null;
        }
        Room room = new Room(roomDTO.getLabel(),examinationKind,clinicAdministrator.getClinic());
        return roomRepository.save(room);
    }


    private ExaminationKind getKind(String kind){
        if(kind.equals("EXAMINATION")){
            return ExaminationKind.EXAMINATION;
        }else if(kind.equals("OPERATION")){
            return ExaminationKind.OPERATION;
        }else {
            return null;
        }
    }
}
