package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;
import ftn.tim16.ClinicalCentreSystem.model.TimeOffNurse;

import java.time.LocalDateTime;
import java.util.List;

public interface TimeOffNurseService {
    boolean isNurseOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<TimeOffNurse> findByNurseIdAndStatus(Long id, TimeOffStatus status);
}
