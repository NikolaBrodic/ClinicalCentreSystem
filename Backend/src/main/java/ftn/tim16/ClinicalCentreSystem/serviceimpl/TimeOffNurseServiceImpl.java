package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.model.TimeOffNurse;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffNurseRepository;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffNurseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TimeOffNurseServiceImpl implements TimeOffNurseService {

    @Autowired
    private TimeOffNurseRepository timeOffNurseRepository;

    @Override
    public boolean isNurseOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<TimeOffNurse> timeOffNurses = timeOffNurseRepository.findByNurseId(id);
        if(!timeOffNurses.isEmpty()){
            for(TimeOffNurse timeOffNurse : timeOffNurses){
                if(!timeOffNurse.getInterval().isAvailable(startDateTime,endDateTime)){
                    return true;
                }
            }
        }
        return false;
    }
}
