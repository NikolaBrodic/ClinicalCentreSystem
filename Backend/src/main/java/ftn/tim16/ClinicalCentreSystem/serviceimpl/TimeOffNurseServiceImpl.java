package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;
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
        List<TimeOffNurse> timeOffNurses = timeOffNurseRepository.findByNurseIdAndStatus(id, TimeOffStatus.APPROVED);
        if (!timeOffNurses.isEmpty()) {
            for (TimeOffNurse timeOffNurse : timeOffNurses) {
                if (!timeOffNurse.getInterval().isAvailable(startDateTime, endDateTime)) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public List<TimeOffNurse> findByNurseIdAndStatus(Long id, TimeOffStatus status) {
        return timeOffNurseRepository.findByNurseIdAndStatus(id, status);
    }
}
