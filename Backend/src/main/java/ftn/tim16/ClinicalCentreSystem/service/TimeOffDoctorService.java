package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;
import ftn.tim16.ClinicalCentreSystem.model.TimeOffDoctor;

import java.time.LocalDateTime;
import java.util.List;

public interface TimeOffDoctorService {

    boolean isDoctorOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<TimeOffDoctor> findByDoctorIdAndStatus(Long id, TimeOffStatus status);
}
