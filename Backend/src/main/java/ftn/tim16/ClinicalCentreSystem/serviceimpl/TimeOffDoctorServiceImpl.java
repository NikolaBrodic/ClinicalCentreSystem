package ftn.tim16.ClinicalCentreSystem.serviceimpl;

import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;
import ftn.tim16.ClinicalCentreSystem.model.TimeOffDoctor;
import ftn.tim16.ClinicalCentreSystem.repository.TimeOffDoctorRepository;
import ftn.tim16.ClinicalCentreSystem.service.TimeOffDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TimeOffDoctorServiceImpl implements TimeOffDoctorService {

    @Autowired
    private TimeOffDoctorRepository timeOffDoctorRepository;

    @Override
    public boolean isDoctorOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        List<TimeOffDoctor> timeOffDoctors = timeOffDoctorRepository.findByDoctorIdAndStatus(id, TimeOffStatus.APPROVED);
        if (!timeOffDoctors.isEmpty()) {
            for (TimeOffDoctor timeOffDoctor : timeOffDoctors) {
                if (!timeOffDoctor.getInterval().isAvailable(startDateTime, endDateTime)) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public List<TimeOffDoctor> findByDoctorIdAndStatus(Long id, TimeOffStatus status) {
        return timeOffDoctorRepository.findByDoctorIdAndStatus(id, status);
    }
}
