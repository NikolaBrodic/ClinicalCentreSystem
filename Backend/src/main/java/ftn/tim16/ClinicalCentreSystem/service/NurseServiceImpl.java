package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.UserDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.UserStatus;
import ftn.tim16.ClinicalCentreSystem.model.Doctor;
import ftn.tim16.ClinicalCentreSystem.model.Examination;
import ftn.tim16.ClinicalCentreSystem.model.Nurse;
import ftn.tim16.ClinicalCentreSystem.repository.NurseRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class NurseServiceImpl implements NurseService{
    @Autowired
    private NurseRepository nurseRepository;

    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private TimeOffNurseService timeOffNurseService;

    public Nurse changePassword(String newPassword, Nurse user) {
        user.setPassword(newPassword);
        if(user.getStatus().equals(UserStatus.NEVER_LOGGED_IN)){
            user.setStatus(UserStatus.ACTIVE);
        }
        return nurseRepository.save(user);
    }

    @Override
    public Nurse getRandomNurse(Long clinic_id,LocalDateTime startDateTime,LocalDateTime endDateTime) {
        List<Nurse> nurses = getAvailable(clinic_id,startDateTime,endDateTime);
        if(nurses.isEmpty()){
            return null;
        }
        return nurses.get(new Random().nextInt(nurses.size()));
    }

    private List<Nurse> getAvailable(Long clinic_id, LocalDateTime startDateTime,LocalDateTime endDateTime){
        List<Nurse> nurses = nurseRepository.findByClinicId(clinic_id);
        List<Nurse> availableNurses = new ArrayList<>();
        for (Nurse nurse: nurses) {
            if(isAvailable(nurse.getId(),startDateTime,endDateTime)){
                availableNurses.add(nurse);
            }
        }
        return availableNurses;
    }

    private boolean isAvailable(Long nurseId, LocalDateTime startDateTime,LocalDateTime endDateTime){
        Nurse nurse = nurseRepository.getById(nurseId);
        if(!nurse.isAvailable(startDateTime.toLocalTime(),endDateTime.toLocalTime())){
            return false;
        }

        if(timeOffNurseService.isNurseOnVacation(nurseId,startDateTime,endDateTime)){
            return false;
        }
        List<Examination> examinations = examinationService.getNursesExamination(nurseId);
        if(!examinations.isEmpty()){
            for(Examination examination : examinations){
                if(!examination.getInterval().isAvailable(startDateTime,endDateTime)){
                    return false;
                }
            }
        }
        return true;
    }
}
