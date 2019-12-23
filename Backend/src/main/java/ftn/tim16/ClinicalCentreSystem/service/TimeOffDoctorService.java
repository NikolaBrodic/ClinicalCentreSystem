package ftn.tim16.ClinicalCentreSystem.service;

import ftn.tim16.ClinicalCentreSystem.dto.response.TimeOffDTO;
import ftn.tim16.ClinicalCentreSystem.enumeration.TimeOffStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface TimeOffDoctorService {

    boolean isDoctorOnVacation(Long id, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<TimeOffDTO> findByDoctorIdAndStatus(Long id, TimeOffStatus status);

    List<TimeOffDTO> getRequestsForHolidayOrTimeOff(Long clinicId);

    TimeOffDTO approveRequestForHolidayOrTimeOff(Long id);

    TimeOffDTO rejectRequestForHolidayOrTimeOff(Long id, String reason);

}
