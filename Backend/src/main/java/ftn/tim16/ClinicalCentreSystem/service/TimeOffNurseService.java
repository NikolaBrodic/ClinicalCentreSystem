package ftn.tim16.ClinicalCentreSystem.service;

import java.time.LocalDateTime;

public interface TimeOffNurseService {
    boolean isNurseOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime);
}
