package ftn.tim16.ClinicalCentreSystem.service;

import java.time.LocalDateTime;

public interface TimeOffDoctorService {

    boolean isDoctorOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime);
}
