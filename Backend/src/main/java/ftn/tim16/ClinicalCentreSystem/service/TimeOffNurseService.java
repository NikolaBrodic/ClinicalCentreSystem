package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.response.TimeOffDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface TimeOffNurseService {
    boolean isNurseOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<TimeOffDTO> findByNurseIdAndStatus(Long id, TimeOffStatus status);
}
